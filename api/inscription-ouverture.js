// import { google } from "googleapis";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email } = req.body;

//   if (!email || !email.includes("@")) {
//     return res.status(400).json({ error: "Email invalide" });
//   }

//   try {
//     const googleKeyJsonString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
//     if (!googleKeyJsonString) {
//       throw new Error("Variable d'environnement GOOGLE_SERVICE_ACCOUNT_KEY non définie");
//     }

//     const credentials = JSON.parse(googleKeyJsonString);
//     credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

//     const auth = new google.auth.GoogleAuth({
//       credentials,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });

//     await sheets.spreadsheets.values.append({
//       spreadsheetId: "1OJzx0VoryGptYI-eBN2gcaFM8mbOOrglXcmwYG2jBGo",
//       range: "AlerteOuverture!A:A",
//       valueInputOption: "RAW",
//       requestBody: {
//         values: [[email]],
//       },
//     });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de l'enregistrement" });
//   }
// }
export default function handler(req, res) {
  res.status(200).json({ message: "API ok" });
}
