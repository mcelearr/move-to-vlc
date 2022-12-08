import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { AdvisorFormValues } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

const FIFTY_EURO_FLAT_FEE = 5000;

const parseBody = (body: AdvisorFormValues): Stripe.Metadata => ({
  ...body,
  services: body.services.join(", "),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: AdvisorFormValues = req.body;

  const parsedBody = parseBody(body);

  if (req.method === "POST") {
    const amount = FIFTY_EURO_FLAT_FEE;
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: [
          {
            name: `1 hr consultation on ${body.services.join(", ")}`,
            amount,
            currency: "eur",
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        payment_intent_data: {
          metadata: parsedBody,
        },
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      console.error(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
