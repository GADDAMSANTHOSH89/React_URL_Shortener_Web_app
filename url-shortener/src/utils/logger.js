// Use the correct variable for Create React App projects
const LOG_URL = process.env.REACT_APP_PROXY_LOG_URL;

if (!LOG_URL) {
  console.error("CRITICAL: REACT_APP_PROXY_LOG_URL is not defined in your .env.local file. Logging will not work.");
}

export async function log(pkg, level, component, message) {
  // Prevent logging if the URL was not set.
  if (!LOG_URL) {
    return;
  }

  try {
    const response = await fetch(LOG_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stack: new Error().stack, // Get current stack trace
        level, // e.g., 'info', 'warn', 'error'
        package: pkg, // e.g., 'frontend'
        message, // The log message
        component, // e.g., 'ShortenerPage'
      }),
    });

    if (!response.ok) {
      console.warn("Failed to send log:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending log:", error);
  }
}
