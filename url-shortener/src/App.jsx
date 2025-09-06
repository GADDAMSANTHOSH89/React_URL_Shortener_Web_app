import React, { useState, useEffect } from 'react';
import ShortenerPage from './pages/ShortenerPage.js';
import StatsPage from './pages/StatsPage.js';
import RedirectHandler from './pages/RedirectHandler.js';
import './App.css'; // Assuming you have some basic styles

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    // Default to ShortenerPage if no hash or #/
    if (route === '' || route === '#/' || route === '#/shorten') {
      return <ShortenerPage />;
    }
    if (route === '#/stats') {
      return <StatsPage />;
    }
    // Anything else is treated as a short code for redirection
    return <RedirectHandler />;
  };

  return (
    <div className="App">
      <nav style={{ padding: '1rem', background: '#f0f0f0', textAlign: 'center' }}>
        <a href="#/shorten" style={{ marginRight: '1rem' }}>Shorten URL</a>
        <a href="#/stats">View Stats</a>
      </nav>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;