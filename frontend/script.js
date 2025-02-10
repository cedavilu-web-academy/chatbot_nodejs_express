const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const sendMessage = async ()=> {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage("Tú", userMessage);
    userInput.value = "";

    try {
        const response = await fetch("http://localhost:3001/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
       
        appendMessage("Inteligencia Articial", data.reply);
    } catch (error) {
        console.error("Error en la solicitud:", error);
        appendMessage("IA", "Error al obtener respuesta.");
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}<br><hr>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
