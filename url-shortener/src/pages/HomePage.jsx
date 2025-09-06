import { useState } from "react";
import { log } from "../utils/logger"; // Note the path is now '../utils/logger'

export default function HomePage() {
  const [count, setCount] = useState(0);

  async function handleClick() {
    setCount(c => c + 1);
    await log("frontend", "info", "component", "User clicked Click Me");
  }

  async function simulateError() {
    try {
      throw new Error("Simulated failure");
    } catch (e) {
      await log("frontend", "error", "component", `Simulated error: ${e.message}`);
    }
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Logger Test</h1>
      <p>Button has been clicked {count} times.</p>
      <button onClick={handleClick} style={{ marginRight: '1rem' }}>
        Click Me
      </button>
      <button onClick={simulateError}>
        Simulate Error
      </button>
    </div>
  );
}
