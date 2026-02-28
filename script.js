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

    const replyText = data.replies[0];

    /* =============================
       COMPACT PREMIUM CARD
    ============================== */

    const card = document.createElement("div");
    card.className = "compact-reply-card";

    // Main reply
    const mainReply = document.createElement("div");
    mainReply.style.marginBottom = "16px";
    mainReply.style.lineHeight = "1.6";
    mainReply.textContent = replyText;

    card.appendChild(mainReply);

    // Tone detection
    const tones = detectTones(replyText);

    tones.forEach(tone => {

      const row = document.createElement("div");
      row.className = "tone-row";

      const name = document.createElement("div");
      name.className = "tone-name";
      name.textContent = tone.label;

      const line = document.createElement("div");
      line.className = "tone-line";
      line.textContent = tone.description;

      row.appendChild(name);
      row.appendChild(line);

      card.appendChild(row);
    });

    output.appendChild(card);

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}


/* =========================
   PREMIUM TONE STRUCTURE
========================= */

function detectTones(text) {

  const lower = text.toLowerCase();
  const tones = [];

  if (/calm|understand|steady/.test(lower)) {
    tones.push({
      label: "Soft",
      description: "Maintains calm emotional energy and shows understanding."
    });
  }

  if (/balance|composed|clear/.test(lower)) {
    tones.push({
      label: "Balanced",
      description: "Emotionally grounded while staying rational and controlled."
    });
  }

  if (/position|standard|respect/.test(lower)) {
    tones.push({
      label: "Elite",
      description: "Communicates value, standards, and quiet authority."
    });
  }

  if (/control|dominant|lead|frame/.test(lower)) {
    tones.push({
      label: "Controlled",
      description: "Maintains frame control and structured leadership energy."
    });
  }

  if (tones.length === 0) {
    tones.push({
      label: "Adaptive",
      description: "Adapts smoothly based on conversational context."
    });
  }

  return tones;
}
