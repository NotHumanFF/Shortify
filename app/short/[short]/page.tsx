import redis from '@/lib/redis';
import { redirect } from 'next/navigation';
import Notfound from '@/components/notfound'

export default async function Page({ params }: { params: { short: string } }) {
    const { short } = params;
    const longUrl = await redis.get(short);
    if(longUrl) redirect(longUrl); 
    
    return <Notfound/>; 
}