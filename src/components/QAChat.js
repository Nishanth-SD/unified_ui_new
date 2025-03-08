import { useState } from "react";


const styles = {
  body: {
    fontFamily: "Gill Sans MT, sans-serif",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
  },
  chatContainer: {
    backgroundColor: "#fff",
    width: "95%",
    maxWidth: "950px",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    overflow: "hidden",
    marginTop: "40px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "12px",
    borderRadius: "10px",
    wordWrap: "break-word",
    maxWidth: "90%",
  },
  userMsg: {
    backgroundColor: "#e1ffc7",
    alignSelf: "flex-end",
  },
  botMsg: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
    width: "auto",
    maxWidth: "100%",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    paddingTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  sendButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  sendButtonHover: {
    backgroundColor: "#218838",
  },
  spinner: {
    display: "flex",
    gap: "5px",
    alignSelf: "flex-start",
    marginTop: "10px",
  },
  spinnerDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#28a745",
    animation: "blink 1.5s infinite",
  },
};

const HerbExpertChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `query=${encodeURIComponent(input)}`,
      });
      
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response || "Error occurred", type: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: `Error: ${error.message}`, type: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div className="header">🌿 Herb Expert Chat</div>
      <div style={styles.chatContainer}>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div key={index} style={{ ...styles.message, ...(msg.type === "user" ? styles.userMsg : styles.botMsg) }}>
              {msg.text}
            </div>
          ))}
          {loading && <div style={styles.spinner}><div style={styles.spinnerDot}></div><div style={styles.spinnerDot}></div><div style={styles.spinnerDot}></div></div>}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about herbs..."
            style={styles.input}
          />
          <button style={styles.sendButton} onClick={sendMessage}>Ask</button>
        </div>
      </div>
    </div>
  );
};

export default HerbExpertChat;