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

    // LOOP THROUGH ALL 5 REPLIES
    data.replies.forEach(replyText => {

      const card = document.createElement("div");
      card.className = "reply-box";

      const replyContent = document.createElement("div");
      replyContent.className = "reply-text";
      replyContent.textContent = replyText;

      const toneContainer = document.createElement("div");
      toneContainer.className = "tone-container";

      const detectedTones = detectToneLayers(replyText);

      detectedTones.forEach(tone => {
        const badge = document.createElement("span");
        badge.className = "tone-badge";
        badge.textContent = tone;
        toneContainer.appendChild(badge);
      });

      card.appendChild(replyContent);
      card.appendChild(toneContainer);

      output.appendChild(card);
    });

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}


/* ========= CLEAN TONE ANALYZER ========= */

function detectToneLayers(text) {

  const tones = [];

  if (/emotion|feel|heart|energy|connection/i.test(text))
    tones.push("Psychological");

  if (/standard|position|frame|control|dominant/i.test(text))
    tones.push("Dominant");

  if (/plan|future|direction|next|strategy/i.test(text))
    tones.push("Strategic");

  if (/calm|steady|balanced|respect/i.test(text))
    tones.push("Smooth");

  if (tones.length === 0)
    tones.push("Balanced");

  return tones;
  }
