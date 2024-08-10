"use client";

import { useState } from 'react';
import CloudinaryIconEditor from './components/CloudinaryIconEditor';

export default function HomePage() {
    const [name, setName] = useState('');
    const [context, setContext] = useState('');
    const maxCharacters = 1000;
    const [iconPath, setIconPath] = useState(`/images/dazzle-icon-512x512.png`);
        
    const handleSubmit = e => {
        e.preventDefault();
        let url = `${name}/app-runner?context=${encodeURIComponent(context)}&iconpath=${encodeURIComponent(iconPath)}`;
        window.open(url, '_blank'); // Open the URL in a new window
    };

    return (
        <main className="page-content" style={{flexDirection: 'column'}}>
            <h1>
                <img src="/images/dazzle-icon-192x192.png" style={{height: '2.5rem', width: '2.5rem', marginRight: '5px'}} />
                Dazzle
            </h1>
            <h2 style={{marginBottom: '0rem'}}>
                <p> Create a convenient AI app shortcut </p>
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-label">App Name:</div>
                    <div className="form-value">
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder=''
                            value={name}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-label">AI Setup:</div>
                    <div className="form-value">
                        <textarea
                            maxLength="1000"
                            onChange={(e) => setContext(e.target.value)}
                            placeholder='example: Translate text to English.'
                            value={context}
                            required
                        />
                        <div className="form-subscript">
                            {context.length} / {maxCharacters}
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-label">App Icon:</div>
                    <div className="form-value">
                        <CloudinaryIconEditor initialIconPath={iconPath} onUpload={setIconPath} />
                    </div>
                </div>
                <button type="submit" style={{alignSelf: 'center'}}>Try It Out!</button>
            </form>
        </main>
    );
}
