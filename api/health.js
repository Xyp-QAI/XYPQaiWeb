/**
 * GET /api/health - No env vars required. Use to verify API routing and email config on Vercel.
 */
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const hasResendKey = !!process.env.RESEND_API_KEY;
  const hasAdminEmail = !!(process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS);
  const emailReady = hasResendKey && hasAdminEmail;
  res.status(200).json({
    ok: true,
    api: "contact-form",
    env: {
      hasGoogleSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasGoogleKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON,
      hasResendKey,
      hasAdminEmail,
      emailReady,
    },
    hints: {
      email: !emailReady
        ? [
            ...(!hasResendKey ? ["Add RESEND_API_KEY in Vercel → Settings → Environment Variables."] : []),
            ...(!hasAdminEmail ? ["Add ADMIN_EMAIL (e.g. you@example.com) in Vercel Environment Variables."] : []),
          ]
        : ["To test sending: set EMAIL_TEST_SECRET and visit /api/email-test?secret=that_value"],
    },
  });
}
