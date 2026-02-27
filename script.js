let recognition;
let bossMode = false;

function speak(text, lang = currentLang) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = LANG[lang];
  msg.rate = 0.95;
  window.speechSynthesis.speak(msg);
}

function checkPassword() {
  const pass = document.getElementById("passwordInput").value;
  if (pass === "PAR555") {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("aiScreen").classList.remove("hidden");
    speak("Abhi AI system was started");
    startListening();
  } else {
    alert("Wrong Password");
  }
}

function startListening() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = LANG[currentLang];
  recognition.continuous = true;

  recognition.onresult = async (e) => {
    const text = e.results[e.results.length - 1][0].transcript.toLowerCase();
    document.getElementById("userText").innerText = text;
    handleCommand(text);
  };

  recognition.start();
}

async function handleCommand(text) {
  document.getElementById("aiBall").classList.add("listening");

  // Boss mode
  if (text.includes("i am abhi the boss")) {
    bossMode = true;
    speak("Boss mode activated");
    return;
  }

  if (text.includes("boss mode deactivate")) {
    bossMode = false;
    speak("Boss mode deactivated");
    return;
  }

  // Language change
  if (text.includes("kannada")) changeLanguage("kn");
  if (text.includes("telugu")) changeLanguage("te");
  if (text.includes("tamil")) changeLanguage("ta");
  if (text.includes("english")) changeLanguage("en");

  // YouTube
  if (text.includes("youtube")) {
    const f = document.getElementById("sideFrame");
    f.src = "https://www.youtube.com";
    f.style.display = "block";
    speak("Opening YouTube");
    return;
  }

  // Google
  if (text.includes("google")) {
    const f = document.getElementById("sideFrame");
    f.src = "https://www.google.com";
    f.style.display = "block";
    speak("Opening Google");
    return;
  }

  // ChatGPT
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: text }]
    })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;
  speak(reply);

  document.getElementById("aiBall").classList.remove("listening");
}
