// /app/gem-saver/page.js
"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function GemSaverPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const context = searchParams.get('context');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'manifest';
    // link.href = '/manifest.json';
    link.href = `/api/dynamic-manifest?name=${encodeURIComponent(name)}`;
    console.log("link.href",link.href);
    document.head.appendChild(link);
  }, []);

  return (
    <div>
      <h1>Your app is ready!</h1>
      <div>please use the "Add to Home Screen" option in your browser.</div>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Description:</strong> {description}
      </div>
      <div>
        <strong>Context:</strong> {context}
      </div>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
