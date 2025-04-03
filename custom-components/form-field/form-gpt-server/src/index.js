import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./bridge.html"));
});

app.post("/get-suggestions", async (req, res) => {
  const { prompt, fields } = req.body;

  console.log(prompt);
  console.log(fields);

  // res.json({ reply: question });
  // return

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    There are html inputs, 
    ${JSON.stringify(fields)};
    a json with key as field id and value
    as the field's type..
    this is the context '${prompt}'...
    Can you understand the context and the fields json
    and generate a {'field': 'value of the field that you can get from the above context'}
    Don't explain, only give a json.
    `,
  });

  const newResp = response.text.replace(/```json|```/g, "").trim();
  console.log("newResp => ", newResp);

  const values = JSON.parse(newResp);

  res.json({ reply: values });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
