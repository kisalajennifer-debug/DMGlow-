async function generateReply() {

  const message = document.getElementById("userInput").value;
  const intensity = document.getElementById("intensity").value;
  const output = document.getElementById("outputArea");

  if (!message.trim()) {
    alert("Enter a message first.");
    return;
  }

  output.innerHTML = "Generating...";

  try {

    const response = await fetch("/generate", {   // ✅ FIXED endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, mode: intensity }) // ✅ FIXED key name
    });

    const data = await response.json();

    output.innerHTML = "";

    // Split AI text into separate replies (by line breaks)
    const replies = data.reply
      .split("\n")
      .filter(r => r.trim() !== "");

    replies.forEach(reply => {

      const box = document.createElement("div");
      box.className = "reply-box";
      box.textContent = reply.trim();

      output.appendChild(box);
    });

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}
