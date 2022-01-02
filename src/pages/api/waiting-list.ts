import { NextApiRequest, NextApiResponse } from "next";
import { WaitingListFormValues } from "@/types";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: WaitingListFormValues = req.body;
  try {
    await sendgrid.send({
      to: process.env.SENDGRID_INBOX_EMAIL,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `[MoveToVLC]:NomadVisaWaitingList:${body.email}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <body>
        <div>
          ${JSON.stringify(body)}
        </div>
      </body>
      </html>`,
    });

    await sendgrid.send({
      to: body.email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `MoveToVLC Nomad Visa Waiting List`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <body>
          <div style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'Gill Sans';">
                </div>
                <div style="margin-left: 20px;margin-right: 20px;">
                <h3>Hey ${body.firstName}, thanks so much for signing up to the waiting list</h3>
                <div style="font-size: 16px;">
                <br>
                </div>
                <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Rory McElearney<br>https://movetovlc.com<br><a href="https://twitter.com/RMcElearney">https://twitter.com/RMcElearney<a></p>
                </div>
        </body>
        </html>`,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default handler;
