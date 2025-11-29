export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <div style={styles.text}>Loading...</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
    height: "100%", // fills parent height
    width: "100%", // fills parent width
    position: "relative",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0, 0, 0, 0.2)",
    borderTop: "4px solid #ff7518",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1em",
    letterSpacing: "1px",
    color: "#ff7518",
  },
};

// Keyframes for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertR;
