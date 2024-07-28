'use client'
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
// import styles from "../../page.module.css";


function GemRunnerContent() {
    let searchParams = useSearchParams();
    let initialContext = searchParams.get('context');
    let initialPrompt = searchParams.get('prompt');
    let { appName } = useParams();

    let initialMessages = [ {"role": "system", "content": initialContext} ];
    // if (initialPrompt)
    //     initialMessages.push({"role": "user", "content": initialPrompt});

    let [promptLog, setPromptLog] = useState({ "messages":initialMessages});
    let [newPrompt, setNewPrompt] = useState("Again!");
    let [isGenerating, setIsGenerating] = useState(false);

    const scrollWindow = () => {
        document.getElementById("bottom-anchor").scrollIntoView({ behavior: 'smooth' });
    }

    let callGemini = async (prompt) => {
        let updatedMessages = [...promptLog.messages, { role: "user", content: prompt }];
        // console.log("newPrompt",newPrompt,"updatedMessages",updatedMessages, "promptLog", promptLog);
        let stringPrompt = updatedMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
        // console.log("stringPrompt", stringPrompt);
        setIsGenerating(true);

        fetch('/api/gemini-caller-no-realtime', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"prompt":stringPrompt})
        })
        .then(response => response.json())
        .then(data => {
            updatedMessages = [...updatedMessages, { role: "assistant", content: data }];
            setPromptLog({messages: updatedMessages});
            // console.log('Response:', data);
            setTimeout(() => scrollWindow() , 200);
            setIsGenerating(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsGenerating(false);
        });
    };

    useEffect(() => {
        if (initialPrompt)
            callGemini(initialPrompt);
    }, []);

    let handleSubmit = async () => {
        callGemini(newPrompt);
    }

    return (
    <div className="page-container">
        <main className="page-content">
            <h1> {appName} </h1>
            <div>
                {/* {messages && <div>{output}</div>} */}
                {promptLog?.messages.map((message, index) => (
                    <div key={index} style={{fontSize: '.7rem'}}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div>
                <input type="text" placeholder="prompt" value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} style={{height:'55px'}}/>
                <button onClick={handleSubmit} disabled={isGenerating}>
                    {isGenerating ? "Generating..." : "Send"}
                </button>
            </div>
            <span id="bottom-anchor"></span>
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