import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { AdvisorFormValues, SERVICE_TYPE } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: AdvisorFormValues = req.body;
  if (req.method === "POST") {
    const amount = (() => {
      switch (body.advisorType) {
        case SERVICE_TYPE.LAWYER:
          return 10000;

        case SERVICE_TYPE.GESTOR:
          return 5000;

        default:
          throw new Error(`Advisor type ${body.advisorType} not found`);
      }
    })();
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: [
          {
            name: `1 hr consultation with ${body.advisorType}`,
            amount,
            currency: "eur",
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        metadata: req.body.values,
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
