
let recognition;
let bossMode=false;

function speak(t,l=false){
let u=new SpeechSynthesisUtterance(t);
u.lang='en-IN';u.rate=0.95;u.pitch=1;u.volume=l?1:0.8;
speechSynthesis.speak(u);
}

function startAI(){
if(document.getElementById('password').value!=='PAR555')return alert('Wrong password');
document.getElementById('startScreen').classList.add('hidden');
document.getElementById('mainUI').classList.remove('hidden');
speak('Abhi AI system started');
initVoice();
}

function initVoice(){
recognition=new(window.SpeechRecognition||window.webkitSpeechRecognition)();
recognition.lang='en-IN';
recognition.continuous=true;

recognition.onstart=()=>setState('listening');
recognition.onend=()=>{setState('idle');recognition.start()};
recognition.onresult=e=>handle(e.results[e.results.length-1][0].transcript.toLowerCase());

recognition.start();
}

function setState(s){
let c=document.getElementById('aiCore');
c.className=s;
document.getElementById('status').innerText=s.toUpperCase();
}

function handle(cmd){
setState('speaking');

if(cmd.includes('abhi ai')) speak('Yes boss Abhi');
else if(cmd.includes('i am the boss abhi')){bossMode=true;speak('Boss mode activated')}
else if(cmd.includes('deactivate the boss mode')){bossMode=false;speak('BOSS MODE DEACTIVATED',true)}
else if(cmd.includes('open google')){openSite('https://www.google.com');speak('Opening Google')}
else if(cmd.includes('open youtube')){openSite('https://www.youtube.com/embed');speak('Opening YouTube')}
else speak('I am listening boss');
}

function openSite(u){
document.getElementById('leftPanel').innerHTML=`<iframe src="${u}" style="width:100%;height:100%;border:none"></iframe>`;
}
