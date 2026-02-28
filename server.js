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

    /* MAIN REPLY CARD */

    const mainReplyCard = document.createElement("div");
    mainReplyCard.className = "main-reply-card";
    mainReplyCard.textContent = data.replies[0];

    output.appendChild(mainReplyCard);

    /* TONE CARDS */

    const tones = detectTones(data.replies[0]);

    tones.forEach(tone => {

      const toneCard = document.createElement("div");
      toneCard.className = "tone-card";

      const toneTitle = document.createElement("div");
      toneTitle.className = "tone-title";
      toneTitle.textContent = "Tone: " + tone.label;

      const toneText = document.createElement("div");
      toneText.className = "tone-text";
      toneText.textContent = tone.description;

      toneCard.appendChild(toneTitle);
      toneCard.appendChild(toneText);

      output.appendChild(toneCard);
    });

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}


function detectTones(text) {

  const lower = text.toLowerCase();
  const tones = [];

  if (/calm|understand|steady/.test(lower)) {
    tones.push({
      label: "Soft",
      description: "This response maintains calm emotional energy and shows understanding."
    });
  }

  if (/balance|composed|clear/.test(lower)) {
    tones.push({
      label: "Balanced",
      description: "This reply keeps emotional control while staying grounded and rational."
    });
  }

  if (/position|standard|respect/.test(lower)) {
    tones.push({
      label: "Elite",
      description: "This tone communicates value, standards, and quiet authority."
    });
  }

  if (/control|dominant|lead|frame/.test(lower)) {
    tones.push({
      label: "Controlled",
      description: "This response maintains frame control and structured leadership energy."
    });
  }

  if (tones.length === 0) {
    tones.push({
      label: "Adaptive",
      description: "This reply adapts smoothly based on conversational context."
    });
  }

  return tones;
}
