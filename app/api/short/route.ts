import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: Request) {
    const { url, short } = await req.json();
    await redis.set(short, url);
    return NextResponse.json({ message: 'Short URL created' });
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const short = searchParams.get('short');
    if(!short){
        return NextResponse.json({ error: 'Invalid short URL' }, { status: 400 });
    }
    const url = await redis.get(short);

    if(url){
        return NextResponse.redirect(url);
    }
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
}