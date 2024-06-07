'use client'
import { useEffect } from 'react';
import styles from "../page.module.css";

export default function GemRunner() {
  // This is overhead needed for PWA to work.
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/manifest.json';
    document.head.appendChild(link);
  }, []);

  const saveAsPWA = () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      window.location.href = '/sample.html';
    } else {
      alert('To save the PWA, please use the "Add to Home Screen" option in your browser.');
    }
  };
    
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <div>Gem PWA</div>
          <div>
            <button onClick={saveAsPWA}>Save Sample Page as PWA</button>
          </div>
        </div>
      </main>
    </div>
  );
}
