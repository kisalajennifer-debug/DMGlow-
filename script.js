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

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, intensity })
    });

    const data = await response.json();

    output.innerHTML = "";

    data.replies.forEach(reply => {

      const box = document.createElement("div");
      box.className = "reply-box";
      box.textContent = reply;

      output.appendChild(box);
    });

  } catch (err) {
    output.innerHTML = "Error generating reply.";
    console.error(err);
  }
}
