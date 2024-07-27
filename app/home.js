// /app/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './home.css';

export default function HomePage() {
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [context, setContext] = useState('');
const router = useRouter();

const handleSubmit = e => {
    e.preventDefault(); 
    // router.push(`${name}/gem-saver?&description=${encodeURIComponent(description)}&context=${encodeURIComponent(context)}`);
    const url = `${name}/gem-saver?&description=${encodeURIComponent(description)}&context=${encodeURIComponent(context)}`;
    window.open(url, '_blank'); // Open the URL in a new window
};

return (
<div className="page-container">
    <div className="page-content">
        <h1>Configure your AI app shortcut</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                Context:
                <input type="text" value={context} onChange={(e) => setContext(e.target.value)} />
                </label>
            </div>
            <button type="submit">Save AI Preset</button>
        </form>
    </div>
</div>
);
}
