const pwd = "PAR555";
let lang = "en";

function checkPwd(){
  const val = document.getElementById("pwd").value;
  if(val === pwd){
    document.getElementById("login").style.display="none";
    document.getElementById("app").classList.remove("hidden");
    speak("Welcome boss Abhi");
    startVoice();
  }else{
    document.getElementById("err").innerText="Wrong password";
  }
}

function speak(text){
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "te" ? "te-IN" : lang === "kn" ? "kn-IN" : lang === "ta" ? "ta-IN" : "en-US";
  speechSynthesis.speak(u);
}

function openGoogle(){
  document.getElementById("frame").src="https://www.google.com/webhp?igu=1";
}

function openYouTube(){
  document.getElementById("frame").src="https://www.youtube.com/embed?autoplay=1";
}

function startVoice(){
  const rec = new(window.SpeechRecognition||window.webkitSpeechRecognition)();
  rec.continuous=true;
  rec.lang="en-US";
  rec.onresult=(e)=>{
    const txt=e.results[e.results.length-1][0].transcript.toLowerCase();
    document.getElementById("status").innerText=txt;

    if(txt.includes("abhi ai")){
      speak("Yes boss");
    }
    if(txt.includes("open google")){
      openGoogle(); speak("Opening Google");
    }
    if(txt.includes("open youtube")){
      openYouTube(); speak("Opening YouTube");
    }
    if(txt.includes("change language to telugu")){
      lang="te"; speak("భాష మార్చబడింది");
    }
  };
  rec.start();
}
