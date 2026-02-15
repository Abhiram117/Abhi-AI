const passwordCorrect = "PAR555";
let bossMode = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

const synth = window.speechSynthesis;

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  synth.speak(utter);
}

function checkPassword() {
  const p = document.getElementById("password").value;
  if (p === passwordCorrect) {
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("ai-screen").classList.remove("hidden");
    speak("Abhi AI was started");
    recognition.start();
  } else {
    document.getElementById("error").innerText = "Wrong Password";
  }
}

recognition.onstart = () => {
  document.getElementById("orb").classList.add("listening");
};
recognition.onend = () => {
  document.getElementById("orb").classList.remove("listening");
  recognition.start();
};

recognition.onresult = (event) => {
  const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
  document.getElementById("log").innerHTML += "<p>" + text + "</p>";

  if (text.includes("i am abhi the boss")) {
    bossMode = true;
    speak("Boss mode is active. Welcome Abhi.");
  }
  if (text.includes("boss mode deactivate")) {
    bossMode = false;
    speak("Boss mode deactivated.");
  }
  if (text.includes("open youtube") || text.includes("play song")) {
    openWeb("https://www.youtube.com");
  }
  if (text.includes("google")) {
    openWeb("https://www.google.com");
  }
};

function openWeb(url) {
  const w = document.getElementById("webview");
  w.src = url;
  w.classList.remove("hidden");
}
