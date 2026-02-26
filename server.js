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
    const { message, mode } = req.body;

    const prompt = `
You are DMGlow Emotional Intelligence Engine.
Tone mode: ${mode}

Analyze emotional intent and generate 3 calibrated high-value replies.

Message:
"${message}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
