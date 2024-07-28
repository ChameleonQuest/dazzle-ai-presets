"use client";

import { useState } from 'react';
import './home.css';

export default function HomePage() {
    const [name, setName] = useState('Donut');
    const [context, setContext] = useState('When prompted with anything, give me a random name of a donut. Be brief.');
    // const [context, setContext] = useState('When asked, tell me the Summer Olympics 2024 events which are schedule for today. Be brief.');
    
    const [prompt, setPrompt] = useState('aaaand Go!');
    const maxCharacters = 1000;

    const handleSubmit = e => {
        e.preventDefault(); 
        const url = `${name}/gem-saver?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}`;
        window.open(url, '_blank'); // Open the URL in a new window
    };

    return (
    <div className="page-container">
        <main className="page-content">
            <h1>Dazzle </h1>
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
