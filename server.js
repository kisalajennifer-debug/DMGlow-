app.post("/generate", async (req, res) => {
  try {
    const { message, mode } = req.body;

    const prompt = `
You are DMGlow Emotional Intelligence Engine.

Tone mode: ${mode}

Generate 5 COMPLETELY DIFFERENT high-value responses.
Each reply must:
- Have different structure
- Use different emotional framing
- Use different sentence rhythm
- Avoid repeating phrases
- Avoid similar openings

Return them clearly formatted as:

REPLY 1:
...
REPLY 2:
...
REPLY 3:
...
REPLY 4:
...
REPLY 5:
...

Message:
"${message}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.95
    });

    const fullText = completion.choices[0].message.content;

    const replies = fullText.split(/REPLY \d:/).filter(Boolean);

    res.json({
      reply1: replies[0]?.trim() || "",
      reply2: replies[1]?.trim() || "",
      reply3: replies[2]?.trim() || "",
      reply4: replies[3]?.trim() || "",
      reply5: replies[4]?.trim() || ""
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
