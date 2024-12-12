// HAUNTED EFFECTS to appear randomly during transmission
// letters folowing cursor + audio effects coded seaparately

// message mutating
function mutateMessage() {
  //check if a message is there
  if (!lastUserMessage || !effectsActivated) return;

  // mutation effects
  const mutations = [
    lastUserMessage.replace(/[aeiou]/gi, "∅"),
    `${lastUserMessage.split("").reverse().join("")}...`,
    lastUserMessage.toUpperCase(),
    `Are you sure you typed: "${lastUserMessage}"?`,
  ];

  const randomMutation =
    mutations[Math.floor(Math.random() * mutations.length)];

  messageContent.innerText = randomMutation;
}

// Possessed cursor and keyboard
//CHANGED: show amelia picture at random
let toggleImage = true; 

function moveCursor() {
  console.log("moving cursor invoked");

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // current scrolling coordinates
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  //generate random postion
  //acounts for scrolling
  const randomX = Math.floor(Math.random() * screenWidth) + scrollX;
  const randomY = Math.floor(Math.random() * screenHeight) + scrollY;

  // create ghost cursor, set up styles
  const ghostCursor = document.createElement("div");
  ghostCursor.id = "ghost-presence";
  ghostCursor.style.position = "absolute";
  ghostCursor.style.width = "25px";
  ghostCursor.style.height = "25px"; 
  ghostCursor.style.zIndex = "100";
  ghostCursor.style.top = `${randomY}px`;
  ghostCursor.style.left = `${randomX}px`;

  // switch
  if (toggleImage) {
    ghostCursor.style.backgroundImage = "url('./assets/img/amelia_smiling.jpg')";
  } else {
    ghostCursor.style.backgroundImage = "url('./assets/img/amelia_smiling-modified.jpg')"; 
  }
  toggleImage = !toggleImage; 
  ghostCursor.style.backgroundSize = "cover";
  ghostCursor.style.backgroundPosition = "center";

  document.body.appendChild(ghostCursor);

  // remove after delay
  setTimeout(() => {
    ghostCursor.remove();
  }, 2000);
}

// show a creepy image (hint?)
// NOT USED
function showHauntedAmelia() {
  const ameliaImage = document.createElement("img");
  ameliaImage.src = "./assets/img/amelia_smiling.jpg";
  ameliaImage.id = "amelia-image";
  ameliaImage.style.width = "300px";
  ameliaImage.style.transition = "filter 1s ease";

  document.body.appendChild(ameliaImage);

  setTimeout(() => {
    // change to skeletal image after 1.5 seconds
    ameliaImage.src = "./assets/img/amelia_smiling-modified.jpg";
  }, 1500);

  setTimeout(() => {
    ameliaImage.remove();
  }, 3000);
}

//NPCs interrupting transmission
const npcs = [
  { name: "Fred", message: "We veered off course..." },
  { name: "Captain", message: "We soared over Gardner." },
  { name: "UNKNOWN", message: "She said she planned this..." },
  { name: "Anon", message: "When I saw her last... she wasn't alone." },
  { name: "UNKNOWN", message: "Don't trust what you see." },
  { name: "Reporter", message: "Rescue mission failed." },
  { name: "Captain", message: "Signs of recent habitation seen." },
  { name: "Reporter", message: "Search mission still  ongoing..." },
  { name: "UNKNOWN", message: "We found an airplane wing." },
  { name: "Reporter", message: "Mission failed to find Electra." },
];

function introduceNPC() {
  const npc = npcs[Math.floor(Math.random() * npcs.length)];
  const npcMessage = document.createElement("div");
  npcMessage.className = "npc-message";
  npcMessage.innerHTML = `<strong>${npc.name}:</strong> ${npc.message}`;
  npcMessage.style.position = "fixed";
  npcMessage.style.top = `${Math.random() * 80 + 10}%`;
  npcMessage.style.left = `${Math.random() * 80 + 10}%`;
  npcMessage.style.color = "white";
  npcMessage.style.background = "rgba(0,0,0,0.8)";
  npcMessage.style.padding = "10px";
  npcMessage.style.borderRadius = "5px";
  document.body.appendChild(npcMessage);

  //removing after 5 secs
  setTimeout(() => {
    npcMessage.remove();
  }, 5000);
}

//GLITCHES to section artifacts text
function applyGlitchEffect() {
  const allText = document.querySelectorAll("p, h1, h2, h3, button");
  allText.forEach((textElement) => {
    textElement.style.position = "relative";
    textElement.style.left = `${Math.random() * 10 - 5}px`;
    textElement.style.color = Math.random() > 0.5 ? "red" : "green";

    //minimal duration 
    setTimeout(() => {
      textElement.style.left = "0";
      textElement.style.color = "";
    }, 1000);
  });
}

// // drifting waves across screen
// function addDriftingWaves() {
//   const waves = document.createElement("div");
//   waves.id = "drifting-waves";
//   document.body.appendChild(waves);
// }

//randomization set up for effcts
//CHANGED:
//increase mutation + glitches  
const hauntedEffects = [
  mutateMessage,
  applyGlitchEffect,
  mutateMessage,
  moveCursor,
  mutateMessage,
  // showHauntedAmelia,
  introduceNPC,
  mutateMessage,
  applyGlitchEffect,
  mutateMessage,
  applyGlitchEffect,
  mutateMessage,
];

// randomizer trgigger
//defined globallyusing windows
window.scheduleHauntedEffects = function () {
  if (!effectsActivated) return; // Only proceed if effects are activated

  // random selction
  const randomEffect =
    hauntedEffects[Math.floor(Math.random() * hauntedEffects.length)];

  // invoke effect
  randomEffect();

  // set up next effect 
  // appears after a random delay
  const randomDelay = Math.floor(Math.random() * 5000) + 3000; // 5 - 8s
  setTimeout(scheduleHauntedEffects, randomDelay);
}

// //DEBUGGER

// // Trigger each effect twice
// let effectIndex = 0;

// window.scheduleHauntedEffects = function () {
//   if (!effectsActivated) return; // Only proceed if effects are activated

//   if (effectIndex < hauntedEffects.length) {
//     // Trigger the current effect twice
//     hauntedEffects[effectIndex]();
//     // setTimeout(hauntedEffects[effectIndex], 500); // Trigger the effect again after 500ms (or adjust timing)

//     effectIndex++;

//     // Schedule the next effect after a delay
//     const randomDelay = Math.floor(Math.random() * 3000); // 3 to 10secs
//     setTimeout(scheduleHauntedEffects, randomDelay);
//   } else {
//     effectIndex = 0; // Reset the index after all effects have been shown ONCE
//     setTimeout(scheduleHauntedEffects, 500); // Restart the cycle after a short delay
//   }
// };