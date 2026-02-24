let currentPlan = "free";
let usageCount = 0;

const limits = {
  free: 3,
  pro: 10,
  premium: Infinity
};

function setPlan(plan) {
  currentPlan = plan;
  usageCount = 0;
  document.getElementById("usage").innerText = 
    `Plan: ${plan.toUpperCase()} | Used: 0/${limits[plan] === Infinity ? "∞" : limits[plan]}`;
}

function generateMessage() {
  if (usageCount >= limits[currentPlan]) {
    document.getElementById("output").innerHTML =
      `<span style="color:#d4af37;">Upgrade to continue glowing ✨</span>`;
    return;
  }

  usageCount++;
  updateUsage();

  const output = document.getElementById("output");
  output.innerHTML = "";
  output.classList.add("glow");

  const text = "Your message is glowing with elegance and confidence.";

  typeWriter(text, output, 0);
}

function updateUsage() {
  document.getElementById("usage").innerText =
    `Plan: ${currentPlan.toUpperCase()} | Used: ${usageCount}/${limits[currentPlan] === Infinity ? "∞" : limits[currentPlan]}`;
}

function typeWriter(text, element, i) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, element, i + 1), 25);
  } else {
    element.classList.remove("glow");
  }
}
