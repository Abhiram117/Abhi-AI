
async function askAI() {
  const input = document.getElementById("userInput").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += "<p>You: " + input + "</p>";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: input }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  chat.innerHTML += "<p>ABHI AI: " + reply + "</p>";
}
