function cleanText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function cap(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ================= SIMPLE INTENT =================
function detectIntent(text) {

  const t = text.toLowerCase();

  if (t.includes("?")) return "question";

  if (/sad|lost|fail|hurt|confused|tired/.test(t))
    return "emotional";

  if (/business|grow|money|youtube|channel|earn|start/.test(t))
    return "business";

  if (/wow|secret|viral|shocking|insane/.test(t))
    return "viral";

  if (/story|remember|yesterday|when/.test(t))
    return "story";

  if (t.split(" ").length < 4)
    return "simple";

  return "random";
}

// ================= PLATFORM ENGINE =================
const engine = {

  youtube: {
    simple: "Key insight on",
    emotional: "Let’s talk about",
    business: "Key insight on",
    viral: "This is important about",
    story: "Here’s a story about",
    question: "Let’s break this down:",
    random: "So today,"
  },

  tiktok: {
    simple: "Growth tip:",
    emotional: "Real talk on",
    business: "Growth tip:",
    viral: "😳 Important:",
    story: "This happened with",
    question: "People ask this:",
    random: "So yeah,"
  },

  facebook: {
    simple: "Important update:",
    emotional: "I’ve been thinking about",
    business: "Important update:",
    viral: "People should see this:",
    story: "This story about",
    question: "A common question:",
    random: "So basically,"
  },

  x: {
    simple: "Insight:",
    emotional: "I feel like",
    business: "Insight:",
    viral: "🚨 Important:",
    story: "Yesterday I noticed",
    question: "People ask:",
    random: "Random:"
  },

  linkedin: {
    simple: "Strategic insight:",
    emotional: "Human reflection on",
    business: "Strategic insight:",
    viral: "Market insight:",
    story: "Experience insight:",
    question: "Industry question:",
    random: "Today,"
  },

  instagram: {
    simple: "Growth:",
    emotional: "Feeling",
    business: "Growth:",
    viral: "🔥",
    story: "Moment:",
    question: "Question:",
    random: "Just"
  },

  whatsapp: {
    simple: "Update:",
    emotional: "Real talk:",
    business: "Update:",
    viral: "Check this:",
    story: "Funny thing:",
    question: "Quick question:",
    random: "So,"
  },

  community: {
    simple: "Thoughts on",
    emotional: "How do you feel about",
    business: "Thoughts on",
    viral: "Everyone is talking about",
    story: "Has anyone experienced",
    question: "Discussion:",
    random: "Random thought:"
  }
};

// ================= GENERATE =================
function generateContent() {

  let input = document.getElementById("topicInput").value;
  if (!input.trim()) return;

  input = cleanText(input);
  const intent = detectIntent(input);

  Object.keys(engine).forEach(platform => {

    let hook = engine[platform][intent] || engine[platform]["random"];

    document.getElementById(platform).innerText =
      hook + " " + cap(input);
  });
}

// ================= COPY SINGLE =================
function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}

// ================= COPY ALL =================
function copyAll() {

  let all = "";

  Object.keys(engine).forEach(p => {
    const text = document.getElementById(p).innerText;
    all += p.toUpperCase() + ": " + text + "\n\n";
  });

  navigator.clipboard.writeText(all);
  alert("All copied!");
}
