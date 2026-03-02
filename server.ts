import express from "express";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = 3000;
const TOKENS_PATH = path.join(__dirname, "google_tokens.json");

// Helper to load/save tokens
function loadTokens() {
  if (fs.existsSync(TOKENS_PATH)) {
    return JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8"));
  }
  return null;
}

function saveTokens(tokens: any, spreadsheetId?: string) {
  const current = loadTokens() || {};
  const updated = { ...current, ...tokens };
  if (spreadsheetId) updated.spreadsheetId = spreadsheetId;
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(updated));
}

app.use(express.json());

// Google OAuth Configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_URL}/auth/callback`
);

// API Routes
app.get("/api/auth/url", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/spreadsheets"],
    prompt: "consent",
  });
  res.json({ url });
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    // Persist tokens on server for automatic connection
    saveTokens(tokens);
    
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'GOOGLE_AUTH_SUCCESS', 
                tokens: ${JSON.stringify(tokens)} 
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Xác thực thành công! Cửa sổ này sẽ tự đóng.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Authentication failed");
  }
});

app.post("/api/sheets/save", async (req, res) => {
  const { tokens: clientTokens, data, spreadsheetId: clientSpreadsheetId } = req.body;
  
  // Try to get tokens from server storage if not provided by client
  const serverData = loadTokens();
  const tokens = clientTokens || (serverData ? { 
    access_token: serverData.access_token, 
    refresh_token: serverData.refresh_token,
    scope: serverData.scope,
    token_type: serverData.token_type,
    expiry_date: serverData.expiry_date
  } : null);

  if (!tokens || !data) {
    return res.status(400).json({ error: "Hệ thống chưa được kết nối với Google Sheets. Vui lòng liên hệ giáo viên." });
  }

  try {
    oauth2Client.setCredentials(tokens);
    const sheets = google.sheets({ version: "v4", auth: oauth2Client });

    let targetId = clientSpreadsheetId || serverData?.spreadsheetId;

    // If no spreadsheetId provided, create a new one
    if (!targetId) {
      const resource = {
        properties: {
          title: "Kết quả kiểm tra Sinh học 4.0 - THPT Dương Xá",
        },
        sheets: [
          {
            properties: {
              title: "Sheet1",
            },
          },
        ],
      };
      const spreadsheet = await sheets.spreadsheets.create({
        requestBody: resource,
        fields: "spreadsheetId",
      });
      targetId = spreadsheet.data.spreadsheetId;
      
      // Save the new spreadsheetId
      saveTokens({}, targetId!);

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: targetId!,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["Thời gian", "Học sinh", "Điểm số", "Số câu đúng", "Tổng số câu"]],
        },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: targetId!,
      range: "Sheet1!A2",
      valueInputOption: "RAW",
      requestBody: {
        values: [data],
      },
    });

    res.json({ success: true, spreadsheetId: targetId });
  } catch (error: any) {
    console.error("Sheets API Error Details:", error.response?.data || error);
    const errorMessage = error.response?.data?.error?.message || error.message || "Unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

app.get("/api/sheets/status", (req, res) => {
  const serverData = loadTokens();
  res.json({ 
    connected: !!serverData?.access_token,
    spreadsheetId: serverData?.spreadsheetId 
  });
});

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
