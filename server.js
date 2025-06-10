const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");

require("dotenv").config(); // Charge les variables d'environnement du .env

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/inscription-ouverture", async (req, res) => {
  const { email } = req.body;
  console.log("📩 Reçu :", email);

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email invalide" });
  }

  try {
    // Récupère la clé Google depuis la variable d'environnement
    const googleKeyJsonString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!googleKeyJsonString) {
      throw new Error("La variable d'environnement GOOGLE_SERVICE_ACCOUNT_KEY n'est pas définie.");
    }

    // Parse la clé JSON
    const credentials = JSON.parse(googleKeyJsonString);

    // Corrige les retours à la ligne dans la clé privée
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    console.log("🔐 Clé JSON chargée depuis variable d'environnement");

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1OJzx0VoryGptYI-eBN2gcaFM8mbOOrglXcmwYG2jBGo",
      range: "AlerteOuverture!A:A",
      valueInputOption: "RAW",
      requestBody: {
        values: [[email]],
      },
    });

    console.log("✅ Email ajouté :", email);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Erreur côté serveur :", err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
});

app.listen(port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
