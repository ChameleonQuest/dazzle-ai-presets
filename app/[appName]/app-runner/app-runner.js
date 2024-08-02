'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Webcam from 'react-webcam';

function GemRunnerContent() {
    const webcamRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    let searchParams = useSearchParams();
    let initialContext = searchParams.get('context');
    let { appName } = useParams();

    const handleSubmit = () => {
        let imageSrc = webcamRef.current.getScreenshot();
        setImageData(imageSrc);
    };

    //// PWA stuff
    useEffect(() => {
        let link = document.createElement('link');
        link.rel = 'manifest';
        link.href = `/${appName}/api/manifest?context=${encodeURIComponent(initialContext)}}`;
        document.head.appendChild(link);
    }, [appName]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                navigator.serviceWorker
                .register(`/${appName}/api/service-worker`, { scope: `/${appName}` })
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
            });
        }
    }, [appName]);
    //// End PWA stuff

    // Effect to run when imageData changes
    useEffect(() => {
        if (imageData !== null) {
            setIsGenerating(true);
            
            fetch('/api/gemini-caller-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"prompt":initialContext, "image":imageData})
            })
            .then(response => response.json())
            .then(data => {
                let updatedMessages = [...promptLog.messages, { role: "assistant", content: data }];
                setPromptLog({messages: updatedMessages});
                console.log('Response:', data);
                setTimeout(() => scrollWindow() , 200);
                setIsGenerating(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsGenerating(false);
            });
        }
    }, [imageData]);
    ////
    ////

    let initialMessages = [ {"role": "system", "content": initialContext} ];

    let [promptLog, setPromptLog] = useState({ "messages":initialMessages});
    let [isGenerating, setIsGenerating] = useState(false);

    const scrollWindow = () => {
        document.getElementById("bottom-anchor").scrollIntoView({ behavior: 'smooth' });
    }

    return (
    <div className="page-container">
        <main className="page-content" style={{paddingRight: '0px'}}>
            <div style={{overflowY: 'auto', height: '98%', margin: '0px', paddingRight: '24px'}}>
                <h1> {appName} </h1>
                <div>
                    {/* {messages && <div>{output}</div>} */}
                    {promptLog?.messages.map((message, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                fontSize: '.7rem', 
                                fontStyle: message.role === "assistant" ? 'italic' : 'normal'
                            }}
                        >
                            <img
                                src="/favicon.ico" 
                                style={{
                                    height:"20px", 
                                    position:"relative", 
                                    top:"5px", 
                                    paddingRight:"2px",
                                    display: message.role === "assistant" ? 'inline-block' : 'none'
                                    }} />
                            {message.content}
                        </div>
                    ))}
                </div>
                {/* {imageData ? ( <img src={imageData} /> ) : ( )} */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png" // Or 'image/jpeg'
                        width={250}
                        height={200}
                        videoConstraints={{
                            facingMode: "environment" // other option is "user"
                        }}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {/* <textarea type="text" placeholder="prompt" value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} style={{height:'55px'}} /> */}
                    <button onClick={handleSubmit} disabled={isGenerating} style={{alignSelf: 'center', width: '250px'}}>
                        {isGenerating ? "Generating..." : "Analyze"}
                    </button>
                </div>
                <span id="bottom-anchor"></span>
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