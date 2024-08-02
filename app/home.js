"use client";

import { useState } from 'react';
import './home.css';

export default function HomePage() {
    const [name, setName] = useState('ToEnglish');
    const [context, setContext] = useState('When provided an image with text, reply with "Source " then tell me the language detected, followed by a colon, followed by the text translated into English.');
    const [prompt, setPrompt] = useState();
    const maxCharacters = 1000;

    const handleSubmit = e => {
        e.preventDefault(); 
        let url = `${name}/app-runner?context=${encodeURIComponent(context)}`;
        if (prompt) {
            url += `&prompt=${encodeURIComponent(prompt)}`;
        }
        window.open(url, '_blank'); // Open the URL in a new window
    };

    return (
    <div className="page-container">
        <main className="page-content" style={{flexDirection: 'column'}}>
            <h1> Dazzle </h1>
            <h2 style={{marginBottom: '0rem'}}>
                <p> Create a convenient AI app shortcut </p>
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-label">App Name:</div>
                    <div className="form-value"><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
                </div>
                <div className="form-row">
                    <div className="form-label">AI Setup:</div>
                    <div className="form-value">
                        <textarea maxLength="1000" value={context} onChange={(e) => setContext(e.target.value)} />
                        <div className="form-subscript">
                            {context.length} / {maxCharacters}
                        </div>
                    </div>
                </div>
                {/* <div className="form-row">
                    <div className="form-label">Prompt:</div>
                    <div className="form-value">
                        <textarea maxLength="1000" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                        <div className="form-subscript">
                            {prompt.length} / {maxCharacters}
                        </div>
                    </div>
                </div> */}

                <button type="submit" style={{alignSelf: 'center'}}>Try It Out!</button>
            </form>
        </main>
    </div>
    );
}
