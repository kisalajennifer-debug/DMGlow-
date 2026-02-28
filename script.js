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

    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, intensity })
    });

    const data = await response.json();

    output.innerHTML = "";

    if (!data.replies || data.replies.length === 0) {
      output.innerHTML = "No reply generated.";
      return;
    }

    const mainReply = data.replies[0];

    /* ===== MAIN REPLY CARD ===== */

    const mainCard = document.createElement("div");
    mainCard.className = "main-reply-card";
    mainCard.textContent = mainReply;

    output.appendChild(mainCard);

    /* ===== TONE VARIATIONS ===== */

    const toneLabels = [
      "Soft",
      "Balanced",
      "Elevated",
      "Dominant",
      "Elite Controlled"
    ];

    toneLabels.forEach(label => {

      const toneCard = document.createElement("div");
      toneCard.className = "tone-card";

      const toneTitle = document.createElement("div");
      toneTitle.className = "tone-title";
      toneTitle.textContent = label;

      const toneText = document.createElement("div");
      toneText.className = "tone-text";
      toneText.textContent = generateToneVariation(mainReply, label);

      toneCard.appendChild(toneTitle);
      toneCard.appendChild(toneText);

      output.appendChild(toneCard);
    });

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}


/* SIMPLE FRONT-END TONE REWRITER */

function generateToneVariation(text, tone) {

  switch (tone) {

    case "Soft":
      return "Gently expressed: " + text;

    case "Balanced":
      return "Calm and composed: " + text;

    case "Elevated":
      return "Refined perspective: " + text;

    case "Dominant":
      return "Direct and firm: " + text;

    case "Elite Controlled":
      return "Strategic and controlled: " + text;

    default:
      return text;
  }
}
