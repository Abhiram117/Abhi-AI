let recognition;
let synth = window.speechSynthesis;

function checkPassword() {
  const pass = document.getElementById("password").value;
  if (pass === "PAR555") {
    document.getElementById("login").style.display = "none";
    document.getElementById("ai").style.display = "block";
    speak("ABHI AI system started");
  } else {
    alert("Wrong password");
  }
}

function startAI() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = langMap[currentLang];
  recognition.continuous = true;

  recognition.onresult = (e) => {
    let text = e.results[e.results.length - 1][0].transcript.toLowerCase();
    handleCommand(text);
  };

  recognition.start();
  document.getElementById("status").innerText = "Listening...";
}

function speak(text) {
  let msg = new SpeechSynthesisUtterance(text);
  msg.lang = langMap[currentLang];
  synth.speak(msg);
}

function handleCommand(cmd) {
  if (cmd.includes("change language to kannada")) changeLanguage("kannada");
  if (cmd.includes("change language to telugu")) changeLanguage("telugu");
  if (cmd.includes("change language to tamil")) changeLanguage("tamil");

  if (cmd.includes("open youtube")) window.open("https://youtube.com", "_blank");
  if (cmd.includes("open chrome")) window.open("https://google.com", "_blank");
  if (cmd.includes("close")) recognition.stop();

  speak("You said " + cmd);
}
