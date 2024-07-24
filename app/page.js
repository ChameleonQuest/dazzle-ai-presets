// /app/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`${name}/gem-saver?&description=${encodeURIComponent(description)}&context=${encodeURIComponent(context)}`);
  };

  return (
    <div>
      <h1>Home Page</h1>
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
      <button onClick={handleSubmit}>Save AI Preset</button>
    </div>
  );
}
