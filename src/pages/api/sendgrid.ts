import { EMAIL_TYPE, SendgridRequest } from "@/types";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req: SendgridRequest, res) {
  try {
    await sendgrid.send({
      to: process.env.SENDGRID_INBOX_EMAIL,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: `[MoveToVLC]:${req.body.type}:${req.body.values.email}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <body>
        <div>
          ${JSON.stringify(req.body.values)}
        </div>
      </body>
      </html>`,
    });

    if (req.body.type === EMAIL_TYPE.NOMAD_WAITING_LIST) {
      await sendgrid.send({
        to: req.body.values.email,
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: `MoveToVLC Nomad Visa Waiting List`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <body>
          <div style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'Gill Sans';">
                </div>
                <div style="margin-left: 20px;margin-right: 20px;">
                <h3>Hey ${req.body.values.firstName}, thanks so much for signing up to the waiting list</h3>
                <div style="font-size: 16px;">
                <br>
                </div>
                <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Rory McElearney<br>https://movetovlc.com<br><a href="https://twitter.com/RMcElearney">https://twitter.com/RMcElearney<a></p>
                </div>
        </body>
        </html>`,
      });
    }

    if ([EMAIL_TYPE.GESTOR, EMAIL_TYPE.LAWYER].includes(req.body.type)) {
      await sendgrid.send({
        to: req.body.values.email,
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: `MoveToVLC request for ${req.body.type}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <body>
          <div style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'Gill Sans';">
                </div>
                <div style="margin-left: 20px;margin-right: 20px;">
                <h3>Hey ${req.body.values.firstName}, thanks for trusting in us to help you get settled in Valencia. You won't regret it 😉</h3>
                <div style="font-size: 16px;">
                <p>One of our expert advisors will be in touch with you shortly to arrange a call.</p>
                <p>Reach out to me on <a href="https://twitter.com/RMcElearney">Twitter<a> if you have any problems. My DMs are open.</p>
                <br>
                </div>
                <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Rory McElearney<br>https://movetovlc.com<br></p>
                </div>
        </body>
        </html>`,
      });
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default handler;
