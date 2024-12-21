'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShortenerForm() {
    const [url, setUrl] = useState('');
    const [short, setShort] = useState('');
    const [urls, setUrls] = useState<{ longUrl: string; shortUrl: string }[]>([]);

    useEffect(() => {
        const storedUrls = JSON.parse(localStorage.getItem('shortUrls') || '[]');
        setUrls(storedUrls);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/short', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, short }),
        });
        const result = await response.json();

        if(result.message === 'Short URL created') {
            const newEntry = { longUrl: url, shortUrl: short };
            const updatedUrls = [...urls, newEntry];
            setUrls(updatedUrls);
            localStorage.setItem('shortUrls', JSON.stringify(updatedUrls));
        }

        alert(result.message);
        setUrl('');
        setShort('');
    };

    return (
        <div>
            {/* Main */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

                <h1 className="text-7xl font-bold mb-8 text-center text-neutral">Shortify</h1>
                <p className="text-lg text-center text-gray-600 mb-8">
                    Paste your long URL and pick a custom short ID of your choice to create a compact link instantly.
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter long URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            className="input input-bordered w-full text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter short name"
                            value={short}
                            onChange={(e) => setShort(e.target.value)}
                            required
                            className="input input-bordered w-full text-black"
                        />
                    </div>
                    <button type="submit" className="btn btn-accent w-full text-lg">
                        Shorten URL
                    </button>
                </form>
            </div>

            {urls.length != 0 && (
                <div className="absolute bottom-1 left-0 right-0 flex flex-col items-center bg-gray-100">
                <p className="text-lg text-gray-600">Scroll down ↓ to see your links</p>
            </div>
            )}


            <div className="flex flex-col items-center justify-center p-40 bg-gray-100">
                {urls.length === 0 ?(
                    <p className="text-lg text-gray-600">No URLs created yet. Start by shortening a link!</p>
                ):(
                    <div className="overflow-x-auto w-[70%]">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className='text-bold text-sm'>No.</th>
                                    <th className='text-bold text-sm'>Long URL</th>
                                    <th className='text-bold text-sm'>Short URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.map((entry, index) => (
                                    <tr key={index} className="hover">
                                        <th className="text-black">{index + 1}</th>
                                        <td className="text-black truncate max-w-xs">
                                            <div title={entry.longUrl}>{entry.longUrl}</div>
                                        </td>
                                        <td className="text-black">
                                            <a
                                                href={`http://localhost:3000/short/${entry.shortUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent underline flex items-center"
                                            >
                                                {entry.shortUrl}
                                                <svg width="18" height="18" viewBox="0 0 48 48" className="h-6 w-6 pl-2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 19H20C15.5817 19 12 22.5817 12 27C12 31.4183 15.5817 35 20 35H36C40.4183 35 44 31.4183 44 27C44 24.9711 43.2447 23.1186 42 21.7084" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path><path d="M6 24.2916C4.75527 22.8814 4 21.0289 4 19C4 14.5817 7.58172 11 12 11H28C32.4183 11 36 14.5817 36 19C36 23.4183 32.4183 27 28 27H18" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path></svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
