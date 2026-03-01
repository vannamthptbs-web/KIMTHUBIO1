import express from "express";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = 3000;

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
    // In a real app, we'd store this in a session/db. 
    // For this demo, we'll send it back to the client via postMessage
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
  const { tokens, data, spreadsheetId } = req.body;
  if (!tokens || !data) {
    return res.status(400).json({ error: "Missing tokens or data" });
  }

  try {
    oauth2Client.setCredentials(tokens);
    const sheets = google.sheets({ version: "v4", auth: oauth2Client });

    let targetId = spreadsheetId;

    // If no spreadsheetId provided, create a new one
    if (!targetId) {
      const resource = {
        properties: {
          title: "Kết quả kiểm tra Sinh học 10 - Vi sinh vật",
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
