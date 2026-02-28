let usedReplies = new Set();

const toneDatabase = {

  soft: [
    "That sounds meaningful. I’d love to hear more about how it unfolded.",
    "I appreciate you sharing that. How are you feeling about it now?",
    "That carries energy. What stood out the most for you?"
  ],

  balanced: [
    "Interesting. What was the outcome?",
    "Alright — how did it go overall?",
    "Good. What feedback did you receive?"
  ],

  elevated: [
    "That’s progress. What impact did it create?",
    "Now that it's out, what’s the next move?",
    "Momentum matters — how was the reception?"
  ],

  dominant: [
    "Results matter. What was delivered?",
    "Did it meet the expected standard?",
    "Give me the outcome directly."
  ],

  elite: [
    "Execution reveals discipline. How did it perform?",
    "I’m focused on results. What changed after it launched?",
    "Was it aligned with your original objective?"
  ]

};

function autoDetectTone(message){

  const lower = message.toLowerCase();

  if (/love|feel|heart|excited|happy|sad/.test(lower)) return "soft";
  if (/project|school|work|meeting/.test(lower)) return "balanced";
  if (/launch|release|big|major/.test(lower)) return "elevated";
  if (/problem|issue|delay|mistake/.test(lower)) return "dominant";

  return "elite";
}

function generateReply(){

  const message = document.getElementById("userInput").value.trim();
  const intensity = document.getElementById("intensity").value;
  const output = document.getElementById("outputArea");

  if(!message){
    alert("Enter a message first.");
    return;
  }

  output.innerHTML = "";

  let detectedTone = intensity === "auto"
      ? autoDetectTone(message)
      : mapIntensity(intensity);

  // Generate ONE reply per tone — clean structure
  Object.keys(toneDatabase).forEach(tone => {

    let replyPool = toneDatabase[tone];
    let randomReply = replyPool[Math.floor(Math.random()*replyPool.length)];

    // Prevent repetition globally
    let attempts = 0;
    while(usedReplies.has(randomReply) && attempts < 10){
      randomReply = replyPool[Math.floor(Math.random()*replyPool.length)];
      attempts++;
    }

    usedReplies.add(randomReply);

    const toneCard = document.createElement("div");
    toneCard.className = "single-tone-card";

    const toneTitle = document.createElement("div");
    toneTitle.className = "single-tone-title";
    toneTitle.textContent = tone.toUpperCase();

    const toneText = document.createElement("div");
    toneText.className = "single-tone-text";
    toneText.textContent = randomReply;

    toneCard.appendChild(toneTitle);
    toneCard.appendChild(toneText);

    output.appendChild(toneCard);

  });

}

function mapIntensity(level){
  switch(level){
    case "1": return "soft";
    case "2": return "balanced";
    case "3": return "elevated";
    case "4": return "dominant";
    case "5": return "elite";
    default: return "balanced";
  }
}
