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

Tone intensity level: ${intensity}

Generate 5 emotionally adaptive replies.
Each reply must:
- Be different from the others
- Use varied structure
- Match the tone intensity
- Be confident and high value

Return ONLY as a numbered list (1-5).

Message:
"${message}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });

    const rawText = completion.choices[0].message.content;

    // Convert numbered text into array
    const replies = rawText
      .split("\n")
      .filter(line => line.trim().match(/^\d/))
      .map(line =>
        line.replace(/^\d+[\).\s-]*/, "").trim()
      );

    res.json({ replies });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
