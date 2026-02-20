import "dotenv/config";
import express from "express";
import cors from "cors";
import { google } from "googleapis";

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

    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:P`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [rowData] },
    });

    console.log(`✓ Successfully appended row. Updated range: ${appendResult.data.updates?.updatedRange || "unknown"}`);
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
