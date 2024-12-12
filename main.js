//global vars
let lastUserMessage = ""; // Stores user's last input
let effectsActivated = false; // Indicates if effects should run

// introduction------------------------------------------------------------------------------
// Signal detection and initial responses
const signalDetected = document.getElementById("signal-detected");
const ameliaAudio = document.getElementById("amelia-audio");

signalDetected.addEventListener("click", () => {
  // chopped signal audio
  ameliaAudio.play();
  signalDetected.classList.add("glitch-effect");

  // glitch duration
  setTimeout(() => {
    signalDetected.classList.remove("glitch-effect");
  }, 3000);

  // system parsing message after delay
  setTimeout(() => {
    document.getElementById("sys_parse").style.display = "block";
  }, 2000);

  // cryptic signal message after delay
  setTimeout(() => {
    document.getElementById("last_words_cryptic").style.display = "block";
  }, 5000);

  // DELAY response
  setTimeout(() => {
    document.getElementById("response_init").style.display = "block";
  }, 8000);
});

// Chat experience ------------------------------------------------------------------------------

// Array of artifacts and associated messages
const artifacts = [
  { id: "artifact-0", message: "I just woke up..." },
  { id: "artifact-1", message: "I am still here." },
  { id: "artifact-2", message: "I don't know what happened." },
  { id: "artifact-3", message: "They say it's by the Pacific..." },
  { id: "artifact-4", message: "How long has it been?" },
  { id: "artifact-5", message: "Life drifts away from me..." },
  { id: "artifact-6", message: "Hope is an illusion" },
  { id: "artifact-7", message: "He greeted me with open arms" },
  { id: "artifact-8", message: "..." },
];

// start chat
// triggering events once button is clicked
document.getElementById("start-journey").addEventListener("click", function () {
  // Disable the button
  const button = this;
  button.disabled = true;
  button.innerText = "Signal Unpacked";

  document.getElementById("sys_loading").style.display = "block";

  setTimeout(() => {
    document.getElementById("sys_loading").style.display = "none";
    //start artifacts
    document.getElementById("artifacts").classList.remove("d-none");
    showNextArtifact();
    messageBox.classList.remove("d-none");

    // randomized bgm
    playRandomAudio();

    // setting up effects
    effectsActivated = true;
    scheduleHauntedEffects();

    //mouse chasing initiated
    startImageSequence();
  }, 2000);
});

let currentArtifactIndex = 0;
const messageBox = document.getElementById("message-box");
const messageContent = document.querySelector(".message-content");

// different buttons in chat box for variation
function updateButtonText(text) {
  const replyButton = document.getElementById("reply");
  replyButton.innerText = text;
}

// Showing next artifact and corresponding message
function showNextArtifact() {
  // Check if there are more artifacts to display
  // up until second last artifact
  if (currentArtifactIndex < artifacts.length - 1) {
    const artifact = artifacts[currentArtifactIndex];
    const artifactElement = document.getElementById(artifact.id);
    artifactElement.classList.remove("d-none");
    messageContent.innerText = artifact.message;

    // set button
    if (currentArtifactIndex % 2 === 1) {
      updateButtonText("Continue");
    } else {
      updateButtonText("Reply");
    }

    currentArtifactIndex++;

    // Scroll to ensure the new artifact and message box are visible
    messageBox.scrollIntoView({ behavior: "smooth" });
  } else {
    //render last artifact wo reply box
    const artifact = artifacts[currentArtifactIndex];
    const artifactElement = document.getElementById(artifact.id);
    artifactElement.classList.remove("d-none");

    messageContent.innerText = "The signal fades into silence...";
    messageContent.classList.add("sys");
    document.getElementById("reply").style.display = "none";

    // show link after end
    setTimeout(revealLink, 2000);

    //website "breaking"
    //after 20 seconds of ending
    setTimeout(() => {
      endInteractionWithBreakdown();
    }, 20000);
  }
}

// Handle replies
document.getElementById("reply").addEventListener("click", function () {
  const replyButton = document.getElementById("reply");

  if (replyButton.innerText === "Continue") {
    //skip intereaction
    showNextArtifact();
  } else {
    const userResponse = prompt("You try to reply... Type your message:");

    if (userResponse) {
      lastUserMessage = userResponse; // store user message
      messageContent.innerText = `"${userResponse}"... echoes into silence.`;
    } else {
      messageContent.innerText = "Your silence is deafening...";
    }

    // show next
    setTimeout(() => {
      showNextArtifact();
    }, 3000);
  }
});

// play random haunting sounds
let audioFiles = [
  "/assets/audio/airplane_crash.mp3",
  "/assets/audio/background_sound.wav",
  "/assets/audio/morse_radio_sos.mp3",
  "/assets/audio/puddle_steps.mp3",
  "/assets/audio/morse_sos.mp3",
];

function playRandomAudio() {
  if (audioFiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const audioFile = audioFiles[randomIndex];
    const randomAudio = new Audio(audioFile);

    //reducing volume (originals too loud)
    randomAudio.volume = 0.3;

    randomAudio.play();
    randomAudio.onended = () => {
      // remove auido from list
      //avoiding repeats
      audioFiles.splice(randomIndex, 1);

      // set up next audio
      if (audioFiles.length > 0) {
        const randomDelay = Math.random() * 25000 + 5000;
        setTimeout(playRandomAudio, randomDelay);
      }
    };
  }
}

//DEBUGGING
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("Document ready, waiting for signal unpack button click.");
// });

//POST CHAT EXPERIENCE

//show link for full story
function typewriterEffect(
  linkText,
  linkHref,
  containerId,
  delayBetweenCycles = 2000
) {
  const container = document.getElementById(containerId);
  container.style.display = "block";

  let typewriterSpan = document.getElementById("typewriter-link");
  let index = 0;
  let typingInterval;
  let isTyping = true;

  function startTyping() {
    // Ensure visibility before typing
    typewriterSpan.style.opacity = 1;
    typewriterSpan.innerHTML = "&nbsp;"; // clearing previous content
    index = 0;
    isTyping = true;

    typingInterval = setInterval(() => {
      if (index < linkText.length) {
        typewriterSpan.innerHTML = `<a href="${linkHref}" target="_blank" style="text-decoration: none; color: #ff5722;">${linkText.slice(
          0,
          index + 1
        )}</a>`;
        index++;
      } else {
        // resetting
        clearInterval(typingInterval);
        isTyping = false;

        setTimeout(() => {
          typewriterSpan.style.opacity = 0;
          setTimeout(startTyping, 3000);
        }, delayBetweenCycles);
      }
    }, 100); //typing speed ms
  }

  startTyping();
}

//invoke effects
function revealLink() {
  const linkText = "l0ok|ng f0r @n$w~rs?";
  const linkHref = "https://tighar.org/Projects/Earhart/AEdescr1.html";
  typewriterEffect(linkText, linkHref, "link-container");
}

//ENDING
//refreshing glitch
function endInteractionWithBreakdown() {
  // console.log("Website breakdown start here");

  //hiding content
  document.body.querySelectorAll("section, nav").forEach((el) => {
    el.style.display = "none";
  });

  // create glitch
  const glitchContainer = document.createElement("div");
  glitchContainer.id = "fullpage-glitch";
  document.body.appendChild(glitchContainer);

  // referesh message for user
  const refreshMessage = document.createElement("div");
  refreshMessage.id = "refresh-message";
  refreshMessage.innerText =
    "The page has been corrupted.\nPlease refresh to try again.";
  document.body.appendChild(refreshMessage);

  // start
  glitchContainer.style.display = "block";

  // remove glitch and show refresh message
  setTimeout(() => {
    glitchContainer.style.display = "none";
    refreshMessage.style.display = "block";
    document.body.style.background = "black";
  }, 2000);

  // Optionally: Disable all interactions on the page
  document.body.style.pointerEvents = "none";
}
