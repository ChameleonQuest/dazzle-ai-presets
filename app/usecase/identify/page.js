'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import styles from './identify.css';
import ChatLog from '../../[appName]/app-runner/components/ChatLog';

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

    // spatializer.js allows real world to be seen when viewed with an AR device.
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '/spatializer.js';
        document.body.appendChild(script);
    }, []);

      
    let initialMessages = [ {"role": "system", "content": initialContext} ];

    let [promptLog, setPromptLog] = useState({ "messages":initialMessages});
    let [isGenerating, setIsGenerating] = useState(false);

    const scrollWindow = () => {
        document.getElementById("bottom-anchor").scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div class="spatial-element" style={{border: 'green solid', display: 'flex', justifyContent: 'center', padding: '8px'}}>
            <div id="layout-chat-block">
                <h1>
                    <img src={iconPath} style={{height: '2.5rem', width: '2.5rem', marginRight: '5px'}} />
                    {appName}
                </h1>

                <ChatLog messages={promptLog?.messages} iconPath={iconPath} clearChat={clearChat} />
            </div>

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="webcam"
                videoConstraints={{
                    facingMode: "environment" // other option is "user"
                }}
            />

            <button onClick={handleSubmit} disabled={isGenerating} style={{alignSelf: 'center', width: '250px'}}>
                {isGenerating ? "Generating..." : "Analyze"}
            </button>
        </div>
    );
}

export default function AppRunnerPage() {
    let initialContext = "What is this"
    let iconPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Question_mark.png/250px-Question_mark.png"
    let appName = "Identify"

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppRunnerContent 
                initialContext={initialContext} 
                iconPath={iconPath} 
                appName={appName} />
        </Suspense>
    );
}