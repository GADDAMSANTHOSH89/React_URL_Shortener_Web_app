import React from 'react';

function StatsPage({ shortenedUrls, onClickShortcode }) {
  if (!shortenedUrls || shortenedUrls.length === 0) {
    return (
      <p style={{ marginTop: '24px', textAlign: 'center' }}>
        No URLs have been shortened yet.
      </p>
    );
  }

  return (
    <div style={{ marginTop: '32px' }}>
      <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>
        URL Shortener Statistics
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
        {shortenedUrls.map(({ shortcode, original, expiry, clicks = [] }, index) => (
          <li key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '16px', paddingLeft: '8px' }}>
            <a
              href={original}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); onClickShortcode(shortcode); }}
              style={{ fontWeight: 'bold', fontSize: '1.1em', textDecoration: 'none', color: '#007bff', cursor: 'pointer' }}
            >
              {shortcode}
            </a>{' '}
            — <span style={{ color: '#555' }}>{original}</span>
            <br />
            <small>Expires at: {expiry}</small>
            <br />
            <small>Total Clicks: {clicks.length}</small>
            {clicks.length > 0 && (
              <ul style={{ fontSize: '0.9em', color: '#555', paddingLeft: '20px' }}>
                {clicks.map((click, i) => (
                  <li key={i}>
                    {click.timestamp} - {click.source}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatsPage;