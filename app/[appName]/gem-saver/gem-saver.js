// /app/gem-saver/page.js
"use client";
import { Suspense, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';

function GemSaverContent() {
const searchParams = useSearchParams();
const { appName } = useParams();
const description = searchParams.get('description');
const context = searchParams.get('context');

useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = `/${appName}/api/manifest`;
    console.log("link.href", link.href);
    document.head.appendChild(link);
}, [appName]);

useEffect(() => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
            .register(`/${appName}/api/service-worker`, { scope: `/${appName}` })
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
        });

        window.addEventListener('appinstalled', (event) => {
            // This resolves an issue where after the initial installation, the user stayed on this page instead of the start_url from the manifest.
            window.location.href = `/${appName}/gem-runner`;
        });
    }
}, [appName]);

// TODO: Detect browser and show how to save PWA on that browser.
return (
<div className="page-container">
    <div className="page-content">
        <h1>Your app is ready!!!</h1>
        <div>please use the "Add to Home Screen" option in your browser.</div>
        <div>
            <strong>Name:</strong> {appName}
        </div>
        <div>
            <strong>Description:</strong> {description}
        </div>
        <div>
            <strong>Context:</strong> {context}
        </div>
        <Link href="/">Back to Home</Link>
    </div>
</div>
);
}

export default function GemSaverPage() {
return (
    <Suspense fallback={<div>Loading...</div>}>
    <GemSaverContent />
    </Suspense>
);
}
