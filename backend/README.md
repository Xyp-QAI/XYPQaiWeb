# Contact Form Backend — Google Sheets Integration

This Express server receives contact form submissions and appends them to a Google Sheet.

## Setup

### 1. Create a Google Sheet

- Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
- Copy the **Spreadsheet ID** from the URL:
  `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID>`**`/edit`

### 2. Create a Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a new project (or pick an existing one).
3. Navigate to **APIs & Services → Library** and enable the **Google Sheets API**.
4. Go to **APIs & Services → Credentials → Create Credentials → Service Account**.
5. Give it a name (e.g. `contact-form-writer`) and click through to create it.
6. Under the service account, go to **Keys → Add Key → Create New Key → JSON**.
7. Download the JSON file. You need two values from it:
   - `client_email`
   - `private_key`

### 3. Share the Sheet

Open your Google Sheet, click **Share**, and add the `client_email` from the JSON key file as an **Editor**.

### 4. Configure environment variables

```bash
cp .env.example .env
```

Fill in the values in `.env`:

| Variable | Description |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON key |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON key (keep the quotes and `\n`) |
| `GOOGLE_SHEET_ID` | Spreadsheet ID from the URL |
| `FRONTEND_URL` | Your frontend origin (default: `http://localhost:5173`) |
| `PORT` | Server port (default: `3001`) |

### 5. Install & Run

```bash
npm install
npm run dev    # development (auto-restart on changes)
npm start      # production
```

The server runs on `http://localhost:3001`.

## API

### `POST /api/contact`

Submit a contact form entry.

**Body (JSON):**

```json
{
  "formType": "general | demo | pricing | support",
  "fullName": "Rahul Sharma",
  "email": "rahul@company.com",
  "phone": "+91 98765 43210",
  "company": "Acme Corp",
  "subject": "General Inquiry",
  "message": "I'd like to know more about...",
  "preferredDate": "2026-03-01",
  "attendees": "5",
  "productOfInterest": "ZYLOENS Platform",
  "solutionNeeded": "Education Solutions",
  "budgetRange": "Under ₹5,00,000",
  "timeline": "1–3 Months",
  "issueCategory": "Bug / Error",
  "priority": "High"
}
```

Only `fullName` and `email` are required. Other fields depend on `formType`.

### `GET /api/health`

Health check endpoint. Returns `{ "status": "ok" }`.

## Google Sheet Columns

The backend auto-creates headers on the first submission:

| Timestamp | Form Type | Full Name | Email | Phone | Company | Subject | Message | Demo Date | Attendees | Product | Solution | Budget | Timeline | Issue Category | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
