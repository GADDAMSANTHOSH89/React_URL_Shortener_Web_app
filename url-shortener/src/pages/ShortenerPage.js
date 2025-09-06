import React, { useState } from 'react';
import { log } from '../utils/logger';

// A mock function for the API call, replace with your actual API call
async function mockApiCall(url) {
  console.log(`Shortening URL: ${url}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return { shortcode: `short_${Math.random().toString(36).substr(2, 5)}` };
}

function ShortenerPage() {
  const [urlInputs, setUrlInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handler to update the URL in state
  const handleUrlChange = (index, value) => {
    const newInputs = [...urlInputs];
    newInputs[index].url = value;
    setUrlInputs(newInputs);
  };

  // Main logic to validate and shorten the URL
  async function validateAndShorten() {
    setError('');
    setIsLoading(true);
    await log("frontend", "info", "component", "Validation process started.");

    // This logic assumes you are only handling one input for now.
    const urlToShorten = urlInputs[0].url;

    if (!urlToShorten.trim()) {
      // CORRECTED LINE
      await log("frontend", "warn", "component", `Validation failed: empty URL.`);
      // CORRECTED LINE
      setError(`Oops! Please enter the original URL.`);
      setIsLoading(false);
      return;
    }

    // Basic URL validation
    try {
      new URL(urlToShorten);
    } catch (_) {
      await log("frontend", "error", "component", `Validation failed: invalid URL format for "${urlToShorten}".`);
      setError('Please enter a valid URL (e.g., https://example.com).');
      setIsLoading(false);
      return;
    }

    try {
      const result = await mockApiCall(urlToShorten);
      const newInputs = [...urlInputs];
      newInputs[0].shortcode = result.shortcode;
      setUrlInputs(newInputs);
      await log("frontend", "info", "component", `Successfully shortened URL to ${result.shortcode}.`);
    } catch (apiError) {
      setError('Failed to shorten the URL. Please try again.');
      await log("frontend", "error", "component", `API error: ${apiError.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>URL Shortener</h2>
      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={urlInputs[0].url}
          onChange={(e) => handleUrlChange(0, e.target.value)}
          style={{ width: '300px', padding: '0.5rem', marginRight: '0.5rem' }}
          disabled={isLoading}
        />
        <button onClick={validateAndShorten} style={{ padding: '0.5rem' }} disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {urlInputs[0].shortcode && (
        <div style={{ marginTop: '1.5rem', background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <p>Your shortened URL:</p>
          <a href={`#/${urlInputs[0].shortcode}`} target="_blank" rel="noopener noreferrer">
            {window.location.origin}/#/{urlInputs[0].shortcode}
          </a>
        </div>
      )}
    </div>
  );
}

export default ShortenerPage;

