import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
  try {
    const { message, intensity } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
You are DMGlow Emotional Intelligence Engine.

User selected intensity: ${intensity}

STEP 1:
Analyze emotional intent of the message.

STEP 2:
Generate EXACTLY 5 completely different emotional responses.

STRICT RULES:
- Each reply must feel unique.
- Do NOT repeat structure.
- Do NOT repeat emotional framing.
- Each reply 1–3 sentences.
- Separate each reply using ONLY this symbol: |||

Message:
"${message}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.95
    });

    const rawText = completion.choices[0].message.content;

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
