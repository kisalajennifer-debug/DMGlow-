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

  const replyPool = toneDatabase[detectedTone];

  let randomReply = replyPool[Math.floor(Math.random()*replyPool.length)];

  // Prevent repetition
  while(usedReplies.has(randomReply)){
    randomReply = replyPool[Math.floor(Math.random()*replyPool.length)];
  }

  usedReplies.add(randomReply);

  // MAIN REPLY CARD
  const mainCard = document.createElement("div");
  mainCard.className = "main-reply-card";
  mainCard.textContent = randomReply;

  output.appendChild(mainCard);

  // TONE CARDS
  Object.keys(toneDatabase).forEach(tone => {

    const toneCard = document.createElement("div");
    toneCard.className = "tone-card";

    const toneTitle = document.createElement("div");
    toneTitle.className = "tone-title";
    toneTitle.textContent = tone.toUpperCase() + " TONE";

    const toneText = document.createElement("div");
    toneText.className = "tone-text";
    toneText.textContent =
      toneDatabase[tone][Math.floor(Math.random()*toneDatabase[tone].length)];

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
