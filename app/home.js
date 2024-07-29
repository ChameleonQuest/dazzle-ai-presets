"use client";

import { useState } from 'react';
import './home.css';

export default function HomePage() {
    const [name, setName] = useState('Inspire');
    const [context, setContext] = useState('When prompted, provide an inspirational quote about achieving your goals.');
    // const [context, setContext] = useState('When prompted with anything, give me a random name of a donut. Be brief.');
    // const [context, setContext] = useState('When asked, tell me the Summer Olympics 2024 events which are schedule for today. Be brief.');
    // const [context, setContext] = useState('When prompted, tell me the current time in Texas, France and New Zealand.');
    // const [context, setContext] = useState('You tell the current weather. Just a brief number estimate such as 80 fahrenheit.');
    // const [context, setContext] = useState('When prompted, give me a cool use-case idea for Google Gemini API. Be brief. 1 to 3 sentences.');
    
    const [prompt, setPrompt] = useState('Go!');
    // const [prompt, setPrompt] = useState('Whats the weather in New York?');
    const maxCharacters = 1000;

    const handleSubmit = e => {
        e.preventDefault(); 
        const url = `${name}/gem-saver?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}`;
        window.open(url, '_blank'); // Open the URL in a new window
    };

    return (
    <div className="page-container">
        <main className="page-content">
            <h1> Dazzle </h1>
            <h2 style={{marginBottom: 1 + 'rem'}}>
                <p> Dazzle will create a convenient AI app shortcut for you. </p>
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-label">*App Name:</div>
                    <div className="form-value"><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
                </div>
                <div className="form-row">
                    <div className="form-label">*AI Context:</div>
                    <div className="form-value">
                        <textarea maxLength="1000" value={context} onChange={(e) => setContext(e.target.value)} />
                        <div className="form-subscript">
                            {context.length} / {maxCharacters}
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-label">Initial Prompt:</div>
                    <div className="form-value">
                        <textarea maxLength="1000" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                        <div className="form-subscript">
                            {prompt.length} / {maxCharacters}
                        </div>
                    </div>
                </div>

                <button type="submit" style={{alignSelf: 'center'}}>Save AI Shortcut</button>
            </form>
        </main>
    </div>
    );
}
