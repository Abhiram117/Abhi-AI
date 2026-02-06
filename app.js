function checkPassword() {
  const pass = document.getElementById("passwordInput").value;
  if (pass === "PAR555") {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainSystem").style.display = "flex";
    startListening();
    speakTelugu("సిస్టమ్ ప్రారంభించబడింది అభి.");
  } else {
    document.getElementById("error").innerText = "Wrong Password";
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;

function startListening() {
  recognition.start();
}

recognition.onresult = function(event) {
  const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
  document.getElementById("userText").innerText = text;

  if (text.includes("i am the boss abhi")) {
    speakTelugu("స్వాగతం బాస్ అభి. మీరు ఈ సిస్టమ్ సృష్టికర్త.");
  } else if (text.includes("open youtube")) {
    openYouTube("technology");
    speakEnglish("Opening YouTube.");
  } else if (text.includes("search")) {
    let q = text.replace("search", "");
    openGoogle(q);
    speakEnglish("Searching Google for " + q);
  }
}

function speakEnglish(msg) {
  const u = new SpeechSynthesisUtterance(msg);
  u.lang = "en-US";
  speechSynthesis.speak(u);
  document.getElementById("aiText").innerText = msg;
}

function speakTelugu(msg) {
  const u = new SpeechSynthesisUtterance(msg);
  u.lang = "te-IN";
  speechSynthesis.speak(u);
  document.getElementById("aiText").innerText = msg;
}

function openGoogle(query) {
  document.getElementById("webArea").innerHTML =
    `<iframe src="https://www.google.com/search?q=${query}&igu=1" width="100%" height="100%"></iframe>`;
}

function openYouTube(query) {
  document.getElementById("webArea").innerHTML =
    `<iframe width="100%" height="100%" src="https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1" allow="autoplay"></iframe>`;
}
