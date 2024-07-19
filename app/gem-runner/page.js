'use client'
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "../page.module.css";
// import { GoogleGenerativeAI } from "@google/generative-ai";


function GemRunnerContent() {
    // console.log("process.env.API_KEY", process.env.API_KEY);

    // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    // let singleStringPrompt = prompt.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    // console.log("singleStringPrompt",singleStringPrompt);


    const [promptLog, setPromptLog] = useState({
        "messages":[
        {"role": "system", "content": "You provide concise answers, with no disclaimers. They are in the form of a rhyme."}
        // {"role": "user", "content": "How do I make paint."}
        // {"role": "assistant", "content": "dddd."}
    ]});
    const [newPrompt, setNewPrompt] = useState("hi");
    // const [output, setOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);  

    // setPromptLog({
    //   "messages":[
    //   {"role": "system", "content": "You provide concise answers, with no disclaimers. They are in the form of a rhyme."},
    //   {"role": "user", "content": "What is a good javascript framwork for making website?"},
    // ]});

    const handleSubmit = async () => {
        let updatedMessages = [...promptLog.messages, { role: "user", content: newPrompt }];
        // console.log("newPrompt",newPrompt,"ammendedLog",ammendedLog, "promptLog", promptLog);
        // ammendedLog.messages.push({"role": "user", "content": newPrompt})
        // setPromptLog({messages: updatedMessages});
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
            // let updatedMessages = [...promptLog.messages, { role: "assistant", content: data }];
            updatedMessages = [...updatedMessages, { role: "assistant", content: data }];
            setPromptLog({messages: updatedMessages});
            // ammendedLog.messages.push({"role": "assistant", "content": data})
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
            name:{name}
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