'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "../page.module.css";

function GemRunnerContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

    
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <div>Gem PWA</div>
          <div>
            name:{name}<br></br>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GemRunnerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GemRunnerContent />
    </Suspense>
  );
}