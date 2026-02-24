import "dotenv/config";
import express from "express";
import cors from "cors";
import { google } from "googleapis";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow multiple origins for development
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

// ---------- Google Sheets auth ----------
import { readFileSync } from "fs";

function loadCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE) {
    return JSON.parse(readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE, "utf-8"));
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
  }
  throw new Error("No Google service account credentials configured. Set GOOGLE_SERVICE_ACCOUNT_KEY_FILE or GOOGLE_SERVICE_ACCOUNT_KEY_JSON in .env");
}

function getAuth() {
  const creds = loadCredentials();
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

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

async function getSheetName(sheets) {
  const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  return sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";
}

async function ensureHeaderRow(sheets) {
  const sheetName = await getSheetName(sheets);
  const range = `${sheetName}!A1:P1`;
  
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
    });

    if (!res.data.values || res.data.values.length === 0) {
      console.log(`Creating header row in sheet "${sheetName}"`);
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: "RAW",
        requestBody: { values: [SHEET_COLUMNS] },
      });
      console.log("✓ Header row created");
    } else {
      console.log(`Header row already exists in sheet "${sheetName}"`);
    }
  } catch (err) {
    console.error(`Error checking/creating header row: ${err.message}`);
    throw err;
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

// ---------- Resend email notification ----------
const FORM_TYPE_LABELS = {
  general: "New Enterprise Inquiry",
  demo: "New Demo Request",
  pricing: "New Pricing Request",
  support: "New Support Request",
};

function buildNotificationHtml(body) {
  const {
    formType = "general", fullName = "", email = "", phone = "",
    company = "", subject = "", message = "", preferredDate = "",
    attendees = "", productOfInterest = "", solutionNeeded = "",
    budgetRange = "", timeline = "", issueCategory = "", priority = "",
  } = body;

  const label = FORM_TYPE_LABELS[formType] || FORM_TYPE_LABELS.general;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const row = (lbl, val) =>
    val
      ? `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top">${lbl}</td><td style="padding:8px 12px;color:#1f2937">${val}</td></tr>`
      : "";

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:100%">
      <tr><td style="background:#0046BE;padding:24px 32px"><h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">XYP Quantum AI</h1><p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px">${label}</p></td></tr>
      <tr><td style="padding:24px 32px 0"><span style="display:inline-block;background:#EBF0FF;color:#0046BE;font-size:12px;font-weight:600;padding:4px 12px;border-radius:9999px;text-transform:uppercase;letter-spacing:0.5px">${formType}</span></td></tr>
      <tr><td style="padding:16px 32px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden">
        ${row("Full Name", fullName)}
        ${row("Email", `<a href="mailto:${email}" style="color:#0046BE;text-decoration:none">${email}</a>`)}
        ${row("Phone", phone)}${row("Company", company)}${row("Subject", subject)}
        ${row("Preferred Demo Date", preferredDate)}${row("Attendees", attendees)}
        ${row("Product of Interest", productOfInterest)}${row("Solution Needed", solutionNeeded)}
        ${row("Budget Range", budgetRange)}${row("Timeline", timeline)}
        ${row("Issue Category", issueCategory)}${row("Priority", priority)}
      </table></td></tr>
      ${message ? `<tr><td style="padding:20px 32px 0"><p style="margin:0 0 8px;font-weight:600;color:#374151;font-size:14px">Message / Details</p><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;color:#1f2937;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</div></td></tr>` : ""}
      <tr><td style="padding:24px 32px;border-top:1px solid #e5e7eb"><p style="margin:0;color:#9ca3af;font-size:12px">Received at ${timestamp} IST</p><p style="margin:4px 0 0;color:#9ca3af;font-size:12px">Reply directly to this email to respond to <strong>${fullName}</strong>.</p></td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

async function sendAdminNotification(body) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) {
    console.warn("Resend not configured (RESEND_API_KEY or ADMIN_EMAIL missing). Skipping email.");
    return { skipped: true };
  }
  const resend = new Resend(apiKey);
  const prefix = FORM_TYPE_LABELS[body.formType] || FORM_TYPE_LABELS.general;
  return resend.emails.send({
    from: "XYP Quantum AI <onboarding@resend.dev>",
    to: [adminEmail],
    replyTo: body.email,
    subject: `${prefix}: ${body.fullName} - XYP Quantum AI`,
    html: buildNotificationHtml(body),
  });
}

// ---------- Routes ----------
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, formType } = req.body;
    
    console.log("\n=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Form Type: ${formType || "general"}`);
    console.log(`Full Name: ${fullName || "N/A"}`);
    console.log(`Email: ${email || "N/A"}`);
    console.log("All form data received:", JSON.stringify(req.body, null, 2));
    
    if (!fullName || !email) {
      console.error("ERROR: Missing required fields (fullName or email)");
      return res.status(400).json({ error: "Full name and email are required." });
    }

    if (!SPREADSHEET_ID) {
      console.error("ERROR: GOOGLE_SHEET_ID is not set in .env");
      return res.status(500).json({ error: "Server configuration error. Please contact support." });
    }

    console.log(`Using Spreadsheet ID: ${SPREADSHEET_ID}`);

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    // Verify we can access the sheet
    try {
      const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
      const sheetName = sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";
      console.log(`Sheet name: ${sheetName}`);
    } catch (authErr) {
      console.error("ERROR: Cannot access Google Sheet. Check permissions and spreadsheet ID.");
      console.error("Auth error details:", authErr.message);
      if (authErr.message.includes("PERMISSION_DENIED")) {
        return res.status(500).json({ error: "Permission denied. Please ensure the service account email has Editor access to the sheet." });
      }
      throw authErr;
    }

    const sheetName = await ensureHeaderRow(sheets);

    const rowData = buildRow(req.body);
    console.log("Row data to append:", rowData);

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

    console.log(`✓ Successfully appended row. Updated range: ${sheetsResult.value.data.updates?.updatedRange || "unknown"}`);

    if (emailResult.status === "rejected") {
      console.error("Admin email failed (non-blocking):", emailResult.reason);
    } else {
      console.log("✓ Admin email sent:", emailResult.value);
    }

    console.log(`✓ [${formType || "general"}] Submission from ${fullName} <${email}> saved successfully`);
    console.log("=== SUBMISSION COMPLETE ===\n");
    
    res.json({ success: true, message: "Your message has been recorded. We'll get back to you soon!" });
  } catch (err) {
    console.error("Google Sheets error:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: "Failed to save your message. Please try again later." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/test-sheet", async (_req, res) => {
  try {
    if (!SPREADSHEET_ID) {
      return res.status(500).json({ error: "GOOGLE_SHEET_ID not configured" });
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheetName = sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";
    
    // Try to read first few rows
    const readResult = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1:P10`,
    });

    res.json({
      success: true,
      spreadsheetId: SPREADSHEET_ID,
      sheetName: sheetName,
      rowCount: readResult.data.values?.length || 0,
      sampleData: readResult.data.values || [],
    });
  } catch (err) {
    console.error("Test sheet error:", err);
    res.status(500).json({
      error: err.message,
      details: err.toString(),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact backend running on http://localhost:${PORT}`);
});
