/**
 * GET /api/email-test?secret=YOUR_EMAIL_TEST_SECRET
 *
 * Sends one test email to ADMIN_EMAIL so you can verify Resend works in production.
 * 1. In Vercel: set env var EMAIL_TEST_SECRET to any string (e.g. mytest123).
 * 2. Visit: https://your-site.vercel.app/api/email-test?secret=mytest123
 * 3. Check the inbox for ADMIN_EMAIL; you should get "XYP Quantum AI – Email test" and the JSON response will say sent: true or show an error.
 */
import { Resend } from "resend";

function getFirstAdminEmail() {
  const raw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL;
  if (!raw || typeof raw !== "string") return null;
  const first = raw.split(/[\s,]+/).map((e) => e.trim().toLowerCase()).find((e) => e && e.includes("@"));
  return first || null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.EMAIL_TEST_SECRET;
  const requestedSecret = req.query.secret;

  if (!secret || requestedSecret !== secret) {
    return res.status(401).json({
      ok: false,
      error: "Missing or invalid secret. Set EMAIL_TEST_SECRET in Vercel and use ?secret=that_value",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = getFirstAdminEmail();

  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      error: "RESEND_API_KEY is not set in Vercel Environment Variables.",
    });
  }
  if (!to) {
    return res.status(500).json({
      ok: false,
      error: "ADMIN_EMAIL (or ADMIN_EMAILS) is not set in Vercel Environment Variables.",
    });
  }

  const from = process.env.RESEND_FROM || "XYP Quantum AI <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      subject: "XYP Quantum AI – Email test",
      html: `
        <p>This is a test email from your contact form pipeline.</p>
        <p>If you received this, Resend and your env vars are working.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
    });

    if (result.error) {
      return res.status(400).json({
        ok: false,
        sent: false,
        error: result.error.message || JSON.stringify(result.error),
        hint: "Verify your domain in Resend and use RESEND_FROM with your domain (e.g. noreply@yourdomain.com).",
      });
    }

    return res.status(200).json({
      ok: true,
      sent: true,
      message: "Test email sent to " + to,
      id: result.data?.id,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      sent: false,
      error: err.message || String(err),
    });
  }
}
