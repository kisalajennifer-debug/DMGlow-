/* ==================================================
   DMGLOW CONNECT – MASTER ENGINE V6
   Emotional Analytics • Weighted Blending • Premium Depth
================================================== */

let selectedReply = "";

/* =========================
   PREMIUM LOCK SYSTEM
========================= */

let premiumUnlocked = false;

function unlockPremium(code){
if(code === "DMGLOW-ELITE-2026"){
premiumUnlocked = true;
alert("Premium Mode Activated.");
}else{
alert("Invalid Code.");
}
}

/* =========================
   GLOBAL MEMORY ROTATION
========================= */

const memory = {
openings: new Set(),
core: new Set(),
enhancers: new Set(),
endings: new Set()
};

/* =========================
   DEPTH CONTROL
========================= */

const depthLevels = {
short: 1,
medium: 2,
deep: 3
};

function getDepth(){
return premiumUnlocked ? "deep" : "medium";
}

/* =========================
   SMART EXPANSION ENGINE
========================= */

function expand(baseArray){
let expanded = [];

baseArray.forEach(item=>{
expanded.push(item);

expanded.push(item.replace(".", " with precision."));
expanded.push(item.replace(".", " intentionally."));
expanded.push(item.replace(".", " with composed strength."));
expanded.push(item.replace(".", " with quiet dominance."));
});

return expanded;
}

/* =========================
   CLUSTERS
========================= */

const clusters = {

appreciation: {
keywords: /thank|grateful|appreciate|value|admire/i,
weight: 1,
openings: expand([
"Your words carry intention.",
"There’s sincerity in what you shared.",
"I recognize the meaning behind that."
]),
core: expand([
"I respond with grounded gratitude.",
"Respect meets respect.",
"Clarity defines appreciation."
]),
enhancers: expand([
"Consistency builds influence.",
"Depth sustains connection.",
"Energy returns refined."
])
},

attraction: {
keywords: /love|miss|desire|chemistry|attracted|magnetic/i,
weight: 1.2,
openings: expand([
"There’s something magnetic in that.",
"That tone carries quiet intensity.",
"Presence like that lingers."
]),
core: expand([
"Attraction grows where composure lives.",
"Confidence speaks without effort.",
"Mystery strengthens connection."
]),
enhancers: expand([
"Silence amplifies interest.",
"Intent defines attraction.",
"Depth builds tension naturally."
])
},

authority: {
keywords: /respect|business|standard|boundary|serious/i,
weight: 1.3,
openings: expand([
"I hear you clearly.",
"The message is received.",
"I understand the direction."
]),
core: expand([
"Position remains steady.",
"Execution outweighs reaction.",
"Standards remain intact."
]),
enhancers: expand([
"Boundaries create respect.",
"Precision protects power.",
"Timing defines leverage."
])
},

support: {
keywords: /sad|hurt|confused|tired|down|stress/i,
weight: 1,
openings: expand([
"I sense the weight in that.",
"There’s honesty in that expression.",
"That carries emotion."
]),
core: expand([
"Emotion is valid and controlled.",
"Strength survives pressure.",
"Clarity emerges through storms."
]),
enhancers: expand([
"Growth lives inside discomfort.",
"Balance restores direction.",
"Resilience builds quietly."
])
},

confidence: {
keywords: /ready|focused|winning|success|determined|goal/i,
weight: 1.1,
openings: expand([
"That’s powerful energy.",
"Confidence is evident there.",
"Momentum is clear."
]),
core: expand([
"Discipline sustains momentum.",
"Focus sharpens advantage.",
"Execution builds dominance."
]),
enhancers: expand([
"Consistency multiplies results.",
"Standards elevate outcomes.",
"Direction strengthens power."
])
}

};

/* =========================
   ENDINGS
========================= */

const endings = expand([
"And that matters.",
"Respect travels both directions.",
"That’s how alignment grows.",
"Presence echoes presence."
]);

/* =========================
   EMOTIONAL ANALYTICS
========================= */

function analyzeEmotion(text){
let scores = {};
let lower = text.toLowerCase();

for(let key in clusters){
let matchCount = (lower.match(clusters[key].keywords) || []).length;
scores[key] = matchCount * clusters[key].weight;
}

let sorted = Object.keys(scores).sort((a,b)=>scores[b]-scores[a]);

if(scores[sorted[0]] === 0) return ["appreciation"];

return sorted.slice(0,2); // top 2 clusters blended
}

/* =========================
   SMART PICK SYSTEM
========================= */

function smartPick(array, type){
let available = array.filter(item => !memory[type].has(item));

if(available.length === 0){
memory[type].clear();
available = array;
}

let choice = available[Math.floor(Math.random()*available.length)];
memory[type].add(choice);

return choice;
}

/* =========================
   HYBRID BLENDING
========================= */

function buildHybrid(clusterNames){

let selectedClusters = clusterNames.map(name => clusters[name]);

let opening = smartPick(
selectedClusters[Math.floor(Math.random()*selectedClusters.length)].openings,
"openings"
);

let core = smartPick(
selectedClusters[Math.floor(Math.random()*selectedClusters.length)].core,
"core"
);

let enhancer = smartPick(
selectedClusters[Math.floor(Math.random()*selectedClusters.length)].enhancers,
"enhancers"
);

return {opening, core, enhancer};
}

/* =========================
   GENERATE
========================= */

function generateReply(){

const input = document.getElementById("userInput").value.trim();
if(!input){ alert("Enter a message first."); return; }

const output = document.getElementById("outputArea");
output.innerHTML = "";
selectedReply = "";

const detected = analyzeEmotion(input);
const depth = getDepth();

for(let i=0;i<5;i++){

let hybrid = buildHybrid(detected);

let ending = smartPick(endings, "endings");

let finalReply = hybrid.opening;

if(depthLevels[depth] >= 2)
finalReply += "\n" + hybrid.core;

if(depthLevels[depth] >= 3)
finalReply += "\n" + hybrid.enhancer;

finalReply += "\n" + ending;

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
