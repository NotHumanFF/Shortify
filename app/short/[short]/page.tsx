import redis from '@/lib/redis';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { short: string } }) {
    const longUrl = await redis.get(params.short);
    console.log('Short key:', params.short);
    console.log('Long URL:', longUrl);
    
    if(longUrl) redirect(longUrl); 
    
    return <h1>URL not found</h1>; 
}