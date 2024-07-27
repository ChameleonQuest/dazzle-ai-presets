"use client";

import { useState } from 'react';
import './home.css';

export default function HomePage() {
    const [name, setName] = useState('somename');
    const [context, setContext] = useState('When asked, show me the current time in Texas, New Zealand, and France. Be brief and display each on a separate lines.');
    const [prompt, setPrompt] = useState('Show me the time');

    const handleSubmit = e => {
        e.preventDefault(); 
        const url = `${name}/gem-saver?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}`;
        window.open(url, '_blank'); // Open the URL in a new window
    };

    return (
    <div className="page-container">
        <div className="page-content">
            <h1>Dazzle </h1>
            <h3 style={{marginBottom: 2 + 'rem'}}>
                <div> Dazzle will create a convenient AI app shortcut for you. </div>
                <div> Configure your AI presets below. </div>
            </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    App Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <div>
                    AI Context:
                    </div>
                    <textarea value={context} onChange={(e) => setContext(e.target.value)} />
                </div>
                <div>
                    <label>
                    Initial Prompt (Optional):
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Save AI Preset</button>
            </form>
        </div>
    </div>
    );
}
