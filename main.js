// button and bg sounds
document.getElementById("start-journey").addEventListener("click", function () {
  document.getElementById("artifacts").classList.remove("d-none"); 
  document.getElementById("background-sound").play(); 
  this.style.display = "none"; // hide btn upon click
  showNextArtifact();
});

// first interaction on page - TODO
// start btn to appear after some delay force interaction
const signalDetected = document.getElementById("signal-detected");
const ameliaAudio = document.getElementById("amelia-audio");

// if can't find/ generate audio, random glitch or haunted noise.
signalDetected.addEventListener("click", () => {
  ameliaAudio.play();
  signalDetected.classList.add("glitch-effect");
  setTimeout(() => {
    signalDetected.classList.remove("glitch-effect");
  }, 3000);
});

// Array of artifacts and their associated messages
const artifacts = [
  { id: "artifact-1", message: "I am still here..." },
  { id: "artifact-2", message: "Where am I?" },
  { id: "artifact-3", message: "They left me here..." },
];

let currentArtifactIndex = 0; // track artificat status
const messageBox = document.getElementById("message-box"); 
const messageContent = document.querySelector(".message-content"); 

// Function to display the next artifact and message
function showNextArtifact() {
  // Check if there are more artifacts to display
  if (currentArtifactIndex < artifacts.length) {
    const artifact = artifacts[currentArtifactIndex];
    const artifactElement = document.getElementById(artifact.id); 
    artifactElement.classList.remove("d-none"); 
    messageContent.innerText = artifact.message;
    messageBox.classList.remove("d-none");
  } else {
    messageBox.classList.add("d-none"); // Hide  message box if no more artifacts
  }
}

// handle user response and move to next artifact
document.getElementById("reply").addEventListener("click", function () {
  const userResponse = prompt("You try to reply... Type your message:");

  // show user reply in the message box
  // TODO - add more options, relevant to reply
  // NLP model? or static responses...
  messageContent.innerText = `"${userResponse}"... echoes into silence.`;

  // Delay to hide the current artifact and message, then show the next one
  setTimeout(() => {
    const currentArtifact = artifacts[currentArtifactIndex].id; 
    document.getElementById(currentArtifact).classList.add("d-none");
    messageBox.classList.add("d-none"); // hide the message box

    currentArtifactIndex++;
    setTimeout(showNextArtifact, 1000);
  }, 3000);
});
