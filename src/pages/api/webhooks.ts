import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Cors from "micro-cors";
import Stripe from "stripe";
import sendgrid from "@sendgrid/mail";
import { AdvisorFormValues } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      if (!Object.entries(paymentIntent.metadata).length) {
        res.status(400).end("metadata has not been set on payment_intent");
      }
      const values = paymentIntent.metadata as unknown as AdvisorFormValues;
      try {
        await sendgrid.send({
          to: process.env.SENDGRID_INBOX_EMAIL,
          from: process.env.SENDGRID_SENDER_EMAIL,
          subject: `[MoveToVLC]:NomadVisaWaitingList:${values.email}`,
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html lang="en">
          <body>
            <div>
              ${JSON.stringify(values)}
            </div>
          </body>
          </html>`,
        });

        await sendgrid.send({
          to: values.email,
          from: process.env.SENDGRID_SENDER_EMAIL,
          subject: `MoveToVLC request for ${values.advisorType}`,
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html lang="en">
          <body>
            <div style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'Gill Sans';">
                  </div>
                  <div style="margin-left: 20px;margin-right: 20px;">
                  <h3>Hey ${values.firstName}, thanks for trusting in us to help you get settled in Valencia. You won't regret it 😉</h3>
                  <div style="font-size: 16px;">
                  <p>One of our expert advisors will be in touch with you shortly to arrange a call.</p>
                  <p>Reach out to me on <a href="https://twitter.com/RMcElearney">Twitter</a> if you have any problems. My DMs are open.</p>
                  <br>
                  </div>
                  <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Rory McElearney<br>https://movetovlc.com<br></p>
                  </div>
          </body>
          </html>`,
        });
      } catch (error) {
        console.error(error);
        res.status(500).end(error);
      }
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
