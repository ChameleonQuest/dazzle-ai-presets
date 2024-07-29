// /app/gem-saver/page.js
"use client";
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';

function GemSaverContent() {
    const searchParams = useSearchParams();
    const { appName } = useParams();
    let isAppInstalled = true;

    const context = searchParams.get('context');
    const prompt = searchParams.get('prompt');

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = `/${appName}/api/manifest?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}`;
        document.head.appendChild(link);
    }, [appName]);

    const redirectToGemRunner = () => {
        window.location.href = `/${appName}/gem-runner?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}`;
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                const relatedApps = await navigator.getInstalledRelatedApps();
                console.log("load event, relatedApps", relatedApps);

                navigator.serviceWorker
                .register(`/${appName}/api/service-worker`, { scope: `/${appName}` })
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
            });

            // This block of code is for the scenario when someone has the app installed but is 
            // visiting the app saving page, in which case we want to redirect them to the running app.
            // Couldn't figure out a cleaner way to do this. We don't know if the app is installed 
            // when the page loads. But if it is not installed, we find out soon after the page loads.
            setTimeout(() => {if (isAppInstalled) redirectToGemRunner()}, 100);
            window.addEventListener('beforeinstallprompt', (e) => {
                console.log("App is not installed",e);
                isAppInstalled = false;
            });

            window.addEventListener('appinstalled', (event) => {
                // This resolves an issue where after the initial installation, the user stayed on this page instead of the start_url from the manifest.
                redirectToGemRunner();
            });
        }
    }, [appName]);

    // TODO: Detect browser and show how to save PWA on that browser.
    return (
    <div className="page-container">
        <main className="page-content">
            <h1>Your app is ready</h1>
            <div style={{alignSelf: 'center'}}>
                <h2>Please use the "Add to Home Screen" option in your browser.</h2>
                <span style={{fontWeight: '700'}}>App Name:</span> {appName}
            </div>
            {/* <div>
                <strong>Context:</strong> {context}
            </div>
            <div>
                <strong>Prompt:</strong> {prompt}
            </div> */}
        </main>
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
