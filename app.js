const { useState, useEffect } = React;

function App() {
  const [isTesting, setIsTesting] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [finalSpeed, setFinalSpeed] = useState(null);

  const simulateSpeedTest = () => {
    setIsTesting(true);
    setSpeed(0);
    setFinalSpeed(null);

    const start = new Date().getTime();
    const image = new Image();
    const fileSize = 500000;

    image.onload = () => {
      const end = new Date().getTime();
      const duration = (end - start) / 1000;
      const bitsLoaded = fileSize * 8;
      const speedMbps = +(bitsLoaded / duration / 1024 / 1024).toFixed(2);
      setFinalSpeed(speedMbps);
    };

    image.onerror = () => {
      setFinalSpeed(0);
    };

    image.src = `https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?cacheBust=${Math.random()}`;
  };

  // Animate counting up
  useEffect(() => {
    if (finalSpeed !== null) {
      let count = 0;
      const interval = setInterval(() => {
        count += 0.5;
        if (count >= finalSpeed) {
          count = finalSpeed;
          clearInterval(interval);
        }
        setSpeed(count.toFixed(1));
      }, 50);
      setIsTesting(false);
    }
  }, [finalSpeed]);

  return (
    <>
      <div className="header">RocketSpeed Internet Test</div>
      <div className="container">
        {isTesting && <div className="rocket"></div>}
        {!isTesting && finalSpeed !== null && (
          <div className="speed-text">{speed} Mbps</div>
        )}
        {!isTesting && finalSpeed === null && (
          <p>Click the button below to test your speed.</p>
        )}
        <button onClick={simulateSpeedTest} disabled={isTesting}>
          {isTesting ? "Testing..." : "Test My Speed"}
        </button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
