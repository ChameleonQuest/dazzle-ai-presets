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
        const imageSrc = webcamRef.current.getScreenshot();
        setImageData(imageSrc);
    };

    // Effect to run when imageData changes
    useEffect(() => {
        if (imageData !== null) {
            let updatedMessages = [...promptLog.messages, { role: "user", content: imageData }];
            // console.log("newPrompt",newPrompt,"updatedMessages",updatedMessages, "promptLog", promptLog);
            
            setIsGenerating(true);
            
            fetch('/api/gemini-caller-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"prompt":initialContext, "image":imageData})
            })
            .then(response => response.json())
            .then(data => {
                updatedMessages = [...updatedMessages, { role: "assistant", content: data }];
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
                <div>
                    {/* <textarea type="text" placeholder="prompt" value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} style={{height:'55px'}} /> */}
                    <button onClick={handleSubmit} disabled={isGenerating}>
                        {isGenerating ? "Generating..." : "Analyze"}
                    </button>
                </div>
                {/* {imageData ? ( <img src={imageData} /> ) : ( )} */}
                <div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png" // Or 'image/jpeg'
                        width={360}
                        height={240}
                        videoConstraints={{
                            facingMode: "environment" // other option is "user"
                        }}
                    />
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