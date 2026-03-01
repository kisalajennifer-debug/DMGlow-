async function generateReply() {

  const message = document.getElementById("userInput").value.trim();
  const intensity = document.getElementById("intensity").value;
  const output = document.getElementById("outputArea");

  if (!message) {
    alert("Enter a message first.");
    return;
  }

  output.innerHTML = "Generating...";

  try {

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, intensity })
    });

    const data = await response.json();
    output.innerHTML = "";

    if (!data.replies || data.replies.length === 0) {
      output.innerHTML = "No replies generated.";
      return;
    }

    /* =============================
       CREATE SEPARATE CARDS
    ============================== */

    data.replies.forEach((replyText, index) => {

      const card = document.createElement("div");
      card.className = "reply-box";

      // Tone Title
      const title = document.createElement("div");
      title.style.fontWeight = "600";
      title.style.color = "#E8C56C";
      title.style.marginBottom = "10px";

      const toneLabels = [
        "Soft",
        "Balanced",
        "Elevated",
        "Dominant",
        "Elite Controlled"
      ];

      title.textContent = toneLabels[index] || "Elite";

      // Reply Text
      const text = document.createElement("div");
      text.style.lineHeight = "1.6";
      text.textContent = replyText;

      card.appendChild(title);
      card.appendChild(text);

      output.appendChild(card);
    });

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}
