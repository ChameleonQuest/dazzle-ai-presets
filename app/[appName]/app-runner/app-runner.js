'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import InstallAlert from '../../components/InstallAlert';
import QrCode from '../../components/QrCode';
import Webcam from 'react-webcam';
import styles from './app-runner.css';
import ChatLog from './components/ChatLog';

function AppRunnerContent({ initialContext, iconPath, appName }) {
    const webcamRef = useRef(null);
    const [imageData, setImageData] = useState(null);

    const handleSubmit = () => {
        let imageSrc = webcamRef.current.getScreenshot();
        setImageData(imageSrc);
    };

    const clearChat = () => {
        // Set chat log to just the original AI context;
        setPromptLog({ "messages":initialMessages});
    };

    // Effect to run when imageData changes
    useEffect(() => {
        if (imageData !== null) {
            setIsGenerating(true);
            
            fetch('/api/gemini-caller', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"prompt":initialContext, "image":imageData})
            })
            .then(response => response.json())
            .then(data => {
                let updatedMessages = [...promptLog.messages, { role: "assistant", content: data }];
                setPromptLog({messages: updatedMessages});
                setTimeout(() => scrollWindow() , 200);
                setIsGenerating(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsGenerating(false);
            });
        }
    }, [imageData]);

    let initialMessages = [ {"role": "system", "content": initialContext} ];

    let [promptLog, setPromptLog] = useState({ "messages":initialMessages});
    let [isGenerating, setIsGenerating] = useState(false);

    const scrollWindow = () => {
        document.getElementById("bottom-anchor").scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <main className="page-content">
            <div id="layout-chat-block">
                <h1>
                    <img src={iconPath} style={{height: '2.5rem', width: '2.5rem', marginRight: '5px'}} />
                    {appName}
                </h1>

                <ChatLog messages={promptLog?.messages} iconPath={iconPath} clearChat={clearChat} />
            </div>
            <div id="layout-webcam-block">
                <div className="qr-code-container">
                    <QrCode />
                </div>
                <div className="webcam-wrapper" >
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        className="webcam"
                        videoConstraints={{
                            facingMode: "environment" // other option is "user"
                        }}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', padding: '8px'}}>
                    <button onClick={handleSubmit} disabled={isGenerating} style={{alignSelf: 'center', width: '250px'}}>
                        {isGenerating ? "Generating..." : "Analyze"}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default function AppRunnerPage() {
    const [showInstallAlert, setShowInstallAlert] = useState(false);
    let searchParams = useSearchParams();
    let initialContext = searchParams.get('context');
    let iconPath = searchParams.get('iconpath');
    let appName = decodeURIComponent(useParams().appName);

    //// PWA stuff
    useEffect(() => {
        let link = document.createElement('link');
        link.rel = 'manifest';
        link.href = `/${appName}/api/manifest?context=${encodeURIComponent(initialContext)}}&iconpath=${encodeURIComponent(iconPath)}`;
        document.head.appendChild(link);
    }, [appName]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                navigator.serviceWorker
                .register(`/${appName}/api/service-worker`, { scope: `/${appName}` })
                .then((registration) => { })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
            });

            window.addEventListener('beforeinstallprompt', (e) => {
                setShowInstallAlert(true);
            });

            window.addEventListener('appinstalled', (event) => {
                setShowInstallAlert(false);
            });
        }
    }, [appName]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppRunnerContent initialContext={initialContext} iconPath={iconPath} appName={appName} />
            {showInstallAlert && ( <InstallAlert /> )}
        </Suspense>
    );
}