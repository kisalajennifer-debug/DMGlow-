import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ===============================
   PREMIUM GENERATE ROUTE
================================ */

app.post("/api/generate", async (req, res) => {
  try {
    const { message, intensity } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
You are DMGlow Elite Reply Engine.

User intensity level: ${intensity}

Generate EXACTLY 5 powerful, emotionally intelligent replies.

STRICT RULES:
- Only output the replies.
- No explanations.
- No analysis.
- No labels.
- No introductions.
- No tone headings.
- Each reply must be 1–3 sentences.
- Separate each reply ONLY using this symbol: |||
- Do NOT include the separator anywhere else.

Message:
"${message}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });

    const rawText = completion.choices[0].message.content.trim();

    const replies = rawText
      .split("|||")
      .map(r => r.trim())
      .filter(r => r.length > 0);

    res.json({ replies });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
