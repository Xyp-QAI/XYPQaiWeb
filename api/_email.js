import { Resend } from "resend";

const FORM_TYPE_LABELS = {
  general: "New Enterprise Inquiry",
  demo: "New Demo Request",
  pricing: "New Pricing Request",
  support: "New Support Request",
};

function getSubject(body) {
  const prefix = FORM_TYPE_LABELS[body.formType] || FORM_TYPE_LABELS.general;
  return `${prefix}: ${body.fullName} - XYP Quantum AI`;
}

function buildNotificationHtml(body) {
  const {
    formType = "general",
    fullName = "",
    email = "",
    phone = "",
    company = "",
    subject = "",
    message = "",
    preferredDate = "",
    attendees = "",
    productOfInterest = "",
    solutionNeeded = "",
    budgetRange = "",
    timeline = "",
    issueCategory = "",
    priority = "",
  } = body;

  const label = FORM_TYPE_LABELS[formType] || FORM_TYPE_LABELS.general;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const row = (lbl, val) =>
    val
      ? `<tr>
           <td style="padding:8px 12px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top">${lbl}</td>
           <td style="padding:8px 12px;color:#1f2937">${val}</td>
         </tr>`
      : "";

  const extraRows = [
    row("Preferred Demo Date", preferredDate),
    row("Number of Attendees", attendees),
    row("Product of Interest", productOfInterest),
    row("Solution Needed", solutionNeeded),
    row("Budget Range", budgetRange),
    row("Timeline", timeline),
    row("Issue Category", issueCategory),
    row("Priority", priority),
  ].join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:100%">

        <!-- Header -->
        <tr>
          <td style="background:#0046BE;padding:24px 32px">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700">XYP Quantum AI</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px">${label}</p>
          </td>
        </tr>

        <!-- Badge -->
        <tr>
          <td style="padding:24px 32px 0">
            <span style="display:inline-block;background:#EBF0FF;color:#0046BE;font-size:12px;font-weight:600;padding:4px 12px;border-radius:9999px;text-transform:uppercase;letter-spacing:0.5px">${formType}</span>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:16px 32px 0">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden">
              ${row("Full Name", fullName)}
              ${row("Email", `<a href="mailto:${email}" style="color:#0046BE;text-decoration:none">${email}</a>`)}
              ${row("Phone", phone)}
              ${row("Company", company)}
              ${row("Subject", subject)}
              ${extraRows}
            </table>
          </td>
        </tr>

        <!-- Message -->
        ${message ? `
        <tr>
          <td style="padding:20px 32px 0">
            <p style="margin:0 0 8px;font-weight:600;color:#374151;font-size:14px">Message / Details</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;color:#1f2937;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</div>
          </td>
        </tr>` : ""}

        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #e5e7eb;margin-top:16px">
            <p style="margin:0;color:#9ca3af;font-size:12px">Received at ${timestamp} IST</p>
            <p style="margin:4px 0 0;color:#9ca3af;font-size:12px">Reply directly to this email to respond to <strong>${fullName}</strong>.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

export async function sendAdminNotification(body) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !adminEmail) {
    console.warn("Resend not configured (RESEND_API_KEY or ADMIN_EMAIL missing). Skipping email.");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: "XYP Quantum AI <onboarding@resend.dev>",
    to: [adminEmail],
    replyTo: body.email,
    subject: getSubject(body),
    html: buildNotificationHtml(body),
  });

  return result;
}
