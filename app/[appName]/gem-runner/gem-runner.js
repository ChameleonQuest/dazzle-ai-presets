'use client'
import { Suspense, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import styles from "../../page.module.css";


function GemRunnerContent() {
    const searchParams = useSearchParams();
    const { appName } = useParams();

    const [promptLog, setPromptLog] = useState({
        "messages":[
        {"role": "system", "content": "You provide concise answers, with no disclaimers. They are in the form of a rhyme."}
    ]});
    const [newPrompt, setNewPrompt] = useState("hi");
    const [isGenerating, setIsGenerating] = useState(false);  

    const handleSubmit = async () => {
        let updatedMessages = [...promptLog.messages, { role: "user", content: newPrompt }];
        // console.log("newPrompt",newPrompt,"ammendedLog",ammendedLog, "promptLog", promptLog);
        let stringPrompt = updatedMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
        // console.log("stringPrompt", stringPrompt);
        setIsGenerating(true);

        fetch('/api/gemini-caller', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"prompt":stringPrompt})
        })
        .then(response => response.json())
        .then(data => {
            updatedMessages = [...updatedMessages, { role: "assistant", content: data }];
            setPromptLog({messages: updatedMessages});
            console.log('Response:', data);
            setIsGenerating(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsGenerating(false);
        });
    };

    return (
    <div className={styles.page}>
        <main className={styles.main}>
        <div className={styles.ctas}>
            <div>Gem PWA</div>
            <div>
            name:{appName}
            <br></br>
            </div>
        </div>
        <div>
            {/* {messages && <div>{output}</div>} */}
            {promptLog?.messages.map((message, index) => (
            <div key={index}>{message.content}</div>
            ))}
        </div>
        <div>
            <input type="text" placeholder="Enter your prompt" value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} />
            <button onClick={handleSubmit} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Submit"}
            </button>
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