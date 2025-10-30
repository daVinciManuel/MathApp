import { useEffect, useState } from "react";

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Summoning spirits...",
    "Mixing potions...",
    "Carving pumpkins...",
    "Scaring bugs away...",
    "Charging broomsticks...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 8px #ff7518, 0 0 20px #ff3300; }
          50% { opacity: 0.6; text-shadow: 0 0 2px #ff7518; }
        }
      `}</style>

      <div style={styles.pumpkin}>
        <div style={styles.stem}></div>
        <div style={styles.eyes}>
          <div style={styles.eye}></div>
          <div style={styles.eye}></div>
        </div>
        <div style={styles.mouth}></div>
      </div>

      <div style={styles.text} className="loading-text">
        {messages[messageIndex]}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "radial-gradient(circle at center, #0d0d0d 0%, #000 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "orange",
    fontFamily: "'Creepster', cursive",
    overflow: "hidden",
  },
  pumpkin: {
    width: "120px",
    height: "120px",
    background: "orange",
    borderRadius: "50%",
    position: "relative",
    boxShadow: "inset -10px 0 #e67300, inset 10px 0 #ff9933",
    animation: "bounce 2s infinite ease-in-out",
  },
  stem: {
    content: "''",
    position: "absolute",
    top: "-20px",
    left: "50%",
    width: "20px",
    height: "30px",
    background: "#4b2e05",
    borderRadius: "5px",
    transform: "translateX(-50%)",
  },
  eyes: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: "50px",
    display: "flex",
    justifyContent: "space-between",
    transform: "translateX(-50%)",
  },
  eye: {
    width: "15px",
    height: "20px",
    background: "black",
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    animation: "blink 4s infinite",
  },
  mouth: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "15px",
    background: "black",
    borderRadius: "0 0 50% 50%",
  },
  text: {
    marginTop: "40px",
    fontSize: "1.5em",
    letterSpacing: "2px",
    animation: "flicker 2s infinite alternate",
    color: "#ff7518",
  },
};
