/* ==================================================
   DMGLOW CONNECT – MASTER ENGINE V7
   Adaptive Personality Stack • Scalable • Premium
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

const depthLevels = { short:1, medium:2, deep:3 };

function getDepth(){
return premiumUnlocked ? "deep" : "medium";
}

/* =========================
   TONE MATRIX (V7 STACK)
========================= */

const toneLayers = {

smooth: "Balance keeps everything steady.",
dominant: "Standards quietly hold the frame.",
psychological: "Energy reveals more than words.",
authority: "Structure protects value."
};

function analyzeTone(text){
text = text.toLowerCase();

return {
emotional: /sad|hurt|miss|love|confused/.test(text),
strategic: /plan|next|decision|future/.test(text),
magnetic: /attracted|chemistry|desire|magnetic/.test(text),
corporate: /business|deal|serious|standard|respect/.test(text)
};
}

/* =========================
   EXPANSION ENGINE
========================= */

function expand(baseArray){
let expanded=[];
baseArray.forEach(item=>{
expanded.push(item);
expanded.push(item.replace(".", " intentionally."));
expanded.push(item.replace(".", " with precision."));
});
return expanded;
}

/* =========================
   CLUSTERS
========================= */

const clusters = {

appreciation:{
keywords:/thank|grateful|appreciate|value/i,
openings:expand([
"Your words carry intention.",
"There’s sincerity in what you shared."
]),
core:expand([
"I respond with grounded gratitude.",
"Respect meets respect."
]),
enhancers:expand([
"Consistency builds influence.",
"Depth sustains connection."
])
},

attraction:{
keywords:/love|miss|desire|chemistry|attracted/i,
openings:expand([
"There’s something magnetic in that.",
"That tone carries quiet intensity."
]),
core:expand([
"Attraction grows where composure lives.",
"Mystery strengthens connection."
]),
enhancers:expand([
"Silence amplifies interest.",
"Depth builds tension naturally."
])
},

authority:{
keywords:/respect|business|standard|boundary/i,
openings:expand([
"I hear you clearly.",
"The message is received."
]),
core:expand([
"Position remains steady.",
"Execution outweighs reaction."
]),
enhancers:expand([
"Boundaries create respect.",
"Timing defines leverage."
])
},

support:{
keywords:/sad|hurt|confused|tired|down/i,
openings:expand([
"I sense the weight in that.",
"There’s honesty in that expression."
]),
core:expand([
"Emotion is valid.",
"Strength survives pressure."
]),
enhancers:expand([
"Resilience builds quietly.",
"Balance restores direction."
])
}

};

/* =========================
   ENDINGS
========================= */

const endings = expand([
"And that matters.",
"Presence echoes presence.",
"That’s how alignment grows."
]);

/* =========================
   DETECT CLUSTERS
========================= */

function detectClusters(text){
let matches=[];
for(let key in clusters){
if(clusters[key].keywords.test(text)){
matches.push(key);
}
}
if(matches.length===0) matches.push("appreciation");
return matches;
}

/* =========================
   SMART PICK (ANTI-REPEAT)
========================= */

function smartPick(array,type){
let available=array.filter(item=>!memory[type].has(item));
if(available.length===0){
memory[type].clear();
available=array;
}
let choice=available[Math.floor(Math.random()*available.length)];
memory[type].add(choice);
return choice;
}

/* =========================
   GENERATE ENGINE
========================= */

function generateReply(){

const input=document.getElementById("userInput").value.trim();
if(!input){ alert("Enter a message first."); return; }

const output=document.getElementById("outputArea");
output.innerHTML="";
selectedReply="";

const detected=detectClusters(input);
const tone=analyzeTone(input);
const depth=getDepth();

for(let i=0;i<5;i++){

let clusterName=detected[Math.floor(Math.random()*detected.length)];
let cluster=clusters[clusterName];

let opening=smartPick(cluster.openings,"openings");
let core=smartPick(cluster.core,"core");
let enhancer=smartPick(cluster.enhancers,"enhancers");
let ending=smartPick(endings,"endings");

let finalReply=opening;

if(depthLevels[depth]>=2)
finalReply+="\n"+core;

if(depthLevels[depth]>=3)
finalReply+="\n"+enhancer;

finalReply+="\n"+ending;

/* Adaptive Personality Injection */

finalReply+="\n"+toneLayers.smooth;

if(tone.strategic) finalReply+="\n"+toneLayers.dominant;
if(tone.emotional) finalReply+="\n"+toneLayers.psychological;
if(tone.corporate) finalReply+="\n"+toneLayers.authority;

let box=document.createElement("div");
box.className="reply-box";
box.textContent=finalReply;

box.onclick=function(){
document.querySelectorAll(".reply-box").forEach(b=>b.classList.remove("selected"));
box.classList.add("selected");
selectedReply=finalReply;
document.getElementById("shareButtons").classList.remove("disabled");
document.getElementById("shareHelper").innerText="Ready to share your selected response.";
};

output.appendChild(box);
}

}
