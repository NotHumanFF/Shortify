'use client';

import { useState } from 'react';

export default function ShortenerForm() {
    const [url, setUrl] = useState('');
    const [short, setShort] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/short', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, short }),
        });
        const result = await response.json();
        alert(result.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <br></br>
            <input
                type="text"
                placeholder="Enter short name"
                value={short}
                onChange={(e) => setShort(e.target.value)}
                required
            />
            <br></br>
            <button type="submit">Shorten URL</button>
        </form>
    );
}
