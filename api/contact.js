/**
 * Vercel serverless API: POST /api/contact → append to Google Sheet + send admin email via Resend.
 * Required env vars: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_KEY_JSON, RESEND_API_KEY, ADMIN_EMAIL.
 */
import { google } from "googleapis";
import { sendAdminNotification } from "./_email.js";

const SHEET_COLUMNS = [
  "Timestamp",
  "Form Type",
  "Full Name",
  "Email",
  "Phone",
  "Company/Institution",
  "Subject",
  "Message / Details",
  "Preferred Demo Date",
  "Number of Attendees",
  "Product of Interest",
  "Solution Needed",
  "Budget Range",
  "Timeline",
  "Issue Category",
  "Priority",
];

function getAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON;
  if (!keyJson) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY_JSON is not set");
  }
  const creds = JSON.parse(keyJson);
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function getSheetName(sheets, spreadsheetId) {
  const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId });
  return sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";
}

async function ensureHeaderRow(sheets, spreadsheetId, sheetName) {
  const range = `${sheetName}!A1:P1`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: [SHEET_COLUMNS] },
    });
  }
  return sheetName;
}

function buildRow(body) {
  const {
    formType,
    fullName,
    email,
    phone,
    company,
    subject,
    message,
    preferredDate,
    attendees,
    productOfInterest,
    solutionNeeded,
    budgetRange,
    timeline,
    issueCategory,
    priority,
  } = body;
  return [
    new Date().toISOString(),
    formType || "general",
    fullName || "",
    email || "",
    phone || "",
    company || "",
    subject || "",
    message || "",
    preferredDate || "",
    attendees || "",
    productOfInterest || "",
    solutionNeeded || "",
    budgetRange || "",
    timeline || "",
    issueCategory || "",
    priority || "",
  ];
}

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { fullName, email, formType } = req.body || {};
    if (!fullName || !email) {
      return res.status(400).json({ error: "Full name and email are required." });
    }

    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
    if (!SPREADSHEET_ID) {
      return res.status(500).json({ error: "Server configuration error. Please contact support." });
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    try {
      await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    } catch (authErr) {
      if (authErr.message?.includes("PERMISSION_DENIED")) {
        return res.status(500).json({
          error: "Permission denied. Ensure the service account has Editor access to the sheet.",
        });
      }
      throw authErr;
    }

    const sheetName = await getSheetName(sheets, SPREADSHEET_ID);
    await ensureHeaderRow(sheets, SPREADSHEET_ID, sheetName);

    const rowData = buildRow(req.body);

    const [sheetsResult, emailResult] = await Promise.allSettled([
      sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:P`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [rowData] },
      }),
      sendAdminNotification(req.body),
    ]);

    if (sheetsResult.status === "rejected") {
      console.error("Google Sheets write failed:", sheetsResult.reason);
      throw sheetsResult.reason;
    }

    if (emailResult.status === "rejected") {
      console.error("Admin email failed (non-blocking):", emailResult.reason);
    } else {
      console.log("Admin email sent:", emailResult.value);
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been recorded. We'll get back to you soon!",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({
      error: "Failed to save your message. Please try again later.",
    });
  }
}
