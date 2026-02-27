/* =====================================
   DMGLOW CONNECT – MASTER ENGINE V3
   Scalable • Rotational • Exhaustion Safe
===================================== */

let selectedReply = "";

/* ======================
   GLOBAL MEMORY SYSTEM
====================== */

let usedFragments = {
openings: new Set(),
core: new Set(),
enhancers: new Set(),
endings: new Set()
};

/* ======================
   CLUSTER DEFINITIONS
====================== */

const clusters = {

appreciation: {
openings: [
"Your words carry weight.",
"There’s sincerity in what you said.",
"That kind of awareness stands out.",
"I recognize the intention behind that.",
"That reflects genuine presence.",
"That level of thoughtfulness is rare.",
"There’s authenticity in that tone.",
"I respect the clarity in your message."
],

core: [
"I respond with grounded gratitude.",
"I meet sincerity with composed strength.",
"Appreciation remains steady and intentional.",
"I return that energy with clarity.",
"I honor the depth behind it.",
"Gratitude doesn’t require noise.",
"Presence answers presence.",
"Strength remains balanced."
],

enhancers: [
"Consistency builds influence.",
"Alignment reveals itself naturally.",
"Strength answers strength.",
"Presence never forces respect.",
"Meaning multiplies when valued.",
"Depth sustains connection.",
"Energy reflects intention.",
"Clarity strengthens appreciation."
]
},

attraction: {
openings: [
"There’s something magnetic in that.",
"That tone carries subtle confidence.",
"There’s quiet intensity there.",
"That kind of expression draws attention.",
"Presence like that doesn’t go unnoticed.",
"There’s refined tension in those words.",
"That energy lingers intentionally."
],

core: [
"Attraction grows where composure lives.",
"Confidence speaks without raising volume.",
"Control deepens intrigue.",
"Energy becomes compelling when balanced.",
"Power doesn’t need to chase.",
"Stability intensifies desire.",
"Mystery strengthens presence."
],

enhancers: [
"Depth builds tension naturally.",
"Silence often amplifies interest.",
"Composure creates desire.",
"Clarity strengthens allure.",
"Intent defines connection.",
"Energy builds momentum quietly."
]
},

authority: {
openings: [
"I hear what you're saying.",
"That perspective is noted.",
"I understand the direction of that.",
"There’s structure in that statement.",
"I see the angle clearly.",
"The message is received.",
"The intention is understood."
],

core: [
"I respond with clarity and standards.",
"Position remains steady.",
"Execution outweighs reaction.",
"Structure protects value.",
"Control defines leadership.",
"Boundaries remain intact.",
"Discipline sustains direction."
],

enhancers: [
"Timing defines leverage.",
"Boundaries create respect.",
"Consistency builds dominance.",
"Precision protects power.",
"Alignment determines outcome.",
"Standards reinforce authority."
]
}

};

/* ======================
   ENDING POOLS
====================== */

const endings = {

soft: [
"And that matters.",
"It’s appreciated.",
"That carries weight.",
"It stays recognized.",
"And it’s acknowledged.",
"That remains noted."
],

poetic: [
"Energy returns in kind.",
"Respect travels both directions.",
"Presence echoes presence.",
"Depth finds depth.",
"Clarity sustains alignment.",
"Strength answers intention."
],

bold: [
"That’s how standards rise.",
"That’s how influence builds.",
"That’s how alignment grows.",
"That’s how power stabilizes.",
"That’s how leadership holds.",
"That’s how value is reinforced."
]

};

/* ======================
   EMOTION DETECTION
====================== */

function detectCluster(text){

text = text.toLowerCase();

if(/love|miss|beautiful|attracted|chemistry|desire|magnetic/.test(text))
return "attraction";

if(/angry|frustrated|respect|standard|serious|business|boundary/.test(text))
return "authority";

return "appreciation";
}

/* ======================
   SMART PICK SYSTEM
====================== */

function smartPick(array, type){

let filtered = array.filter(item => !usedFragments[type].has(item));

if(filtered.length === 0){
usedFragments[type].clear();
filtered = array;
}

let choice = filtered[Math.floor(Math.random() * filtered.length)];
usedFragments[type].add(choice);

return choice;
}

/* ======================
   GENERATE 5 RESPONSES
====================== */

function generateReply(){

const input = document.getElementById("userInput").value.trim();
if(!input){ alert("Enter a message first."); return; }

const clusterName = detectCluster(input);
const cluster = clusters[clusterName];

const output = document.getElementById("outputArea");
output.innerHTML = "";

for(let i=0;i<5;i++){

let opening = smartPick(cluster.openings, "openings");
let core = smartPick(cluster.core, "core");
let enhancer = smartPick(cluster.enhancers, "enhancers");

let endingTypes = ["soft","poetic","bold"];
let endingCategory = endingTypes[i % endingTypes.length];

let ending = smartPick(endings[endingCategory], "endings");

let finalReply =
opening + "\n" +
core + "\n" +
enhancer + "\n" +
ending;

let box = document.createElement("div");
box.className = "reply-box";
box.textContent = finalReply;

box.onclick = function(){
document.querySelectorAll(".reply-box").forEach(b=>b.classList.remove("selected"));
box.classList.add("selected");
selectedReply = finalReply;
document.getElementById("shareButtons").classList.remove("disabled");
document.getElementById("shareHelper").innerText="Ready to share your selected response.";
};

output.appendChild(box);
}

  }
