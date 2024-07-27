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
                    <div className="form-value"><textarea value={context} onChange={(e) => setContext(e.target.value)} /></div>
                </div>
                <div className="form-row">
                    <div className="form-label">Initial Prompt:</div>
                    <div className="form-value"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} /></div>
                </div>

                <button type="submit" style={{alignSelf: 'center'}}>Save AI Shortcut</button>
            </form>
        </div>
    </div>
    );
}
