'use client'
import { useState } from 'react';
import styles from "../page.module.css";

export default function GemRunner() {
  const [name, setName] = useState('');
  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  // This is overhead needed for PWA to work.
  // useEffect(() => {
  //   const link = document.createElement('link');
  //   link.rel = 'manifest';
  //   // link.href = '/manifest.json';
  //   link.href = `/api/dynamic-manifest?name=${encodeURIComponent(name)}`
  //   document.head.appendChild(link);
  // }, []);

  const saveAsPWA = () => {
    // const link = document.createElement('link');
    // link.rel = 'manifest';
    // // link.href = '/manifest.json';
    // link.href = `/api/dynamic-manifest?name=${encodeURIComponent(name)}`
    // document.head.appendChild(link);

    // if (window.matchMedia('(display-mode: standalone)').matches) {
    //   window.location.href = '/sample.html';
    // } else {
    //   alert('To save the PWA, please use the "Add to Home Screen" option in your browser.');
    // }
  };
    
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <div>Gem PWA</div>
          <div>
          name:{name}<br></br>
            <input type="text" value={name} onChange={handleInputChange} placeholder="Enter PWA Name" />
            <button onClick={saveAsPWA}>Save Sample Page as PWA</button>
          </div>
        </div>
      </main>
    </div>
  );
}
