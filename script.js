function generateReply() {

  const message = document.getElementById("userInput").value.trim();
  const output = document.getElementById("outputArea");

  if (!message) {
    alert("Enter a message first.");
    return;
  }

  output.innerHTML = "";

  const toneLabels = [
    "Soft",
    "Balanced",
    "Elevated",
    "Dominant",
    "Elite Controlled"
  ];

  const replies = [
    "I understand where you're coming from. Let’s approach this calmly and clearly:\n\n\"" + message + "\"",

    "I hear your message. Here's a composed and confident reply:\n\n\"" + message + "\"",

    "Let’s clarify this properly. My perspective on this is:\n\n\"" + message + "\"",

    "I’m addressing this directly. Here’s the position I’m taking:\n\n\"" + message + "\"",

    "I move with clarity and control. This is my final response:\n\n\"" + message + "\""
  ];

  replies.forEach((replyText, index) => {

    const card = document.createElement("div");
    card.className = "reply-box";

    const title = document.createElement("div");
    title.className = "tone-title";
    title.textContent = toneLabels[index];

    const text = document.createElement("div");
    text.className = "tone-text";
    text.textContent = replyText;

    card.appendChild(title);
    card.appendChild(text);

    output.appendChild(card);
  });
}
