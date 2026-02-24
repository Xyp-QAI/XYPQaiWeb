/**
 * GET /api/health - No env vars required. Use to verify API routing works on Vercel.
 */
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    ok: true,
    api: "contact-form",
    env: {
      hasGoogleSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasGoogleKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON,
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasAdminEmail: !!(process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS),
    },
  });
}
