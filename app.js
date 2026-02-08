const frame=document.getElementById("frame");
let currentLang="en-US";
function login(){
 const pwd=document.getElementById("password").value;
 if(pwd==="PAR555"){
  document.getElementById("login").style.display="none";
  document.getElementById("main").style.display="flex";
  speak("ABHI AI activated. Welcome Boss.");
 } else alert("Wrong Password");
}
function startAI(){
 const r=new (window.SpeechRecognition||window.webkitSpeechRecognition)();
 r.lang=currentLang;r.start();
 r.onresult=e=>{
  const t=e.results[0][0].transcript.toLowerCase();
  document.querySelector(".status").innerText=t;
  if(t.includes("youtube")){frame.src="https://www.youtube.com";speak("Opening YouTube");}
  if(t.includes("google")){frame.src="https://www.google.com";speak("Opening Google");}
  if(t.includes("i am boss abhi")) speak("Welcome Boss Abhi. Full access granted.");
  if(t.includes("change language to telugu")){currentLang="te-IN";speak("Language changed to Telugu");}
  if(t.includes("change language to kannada")){currentLang="kn-IN";speak("Language changed to Kannada");}
  if(t.includes("change language to tamil")){currentLang="ta-IN";speak("Language changed to Tamil");}
 };
}
function speak(msg){
 const sp=new SpeechSynthesisUtterance(msg);
 sp.lang=currentLang;
 speechSynthesis.speak(sp);
}