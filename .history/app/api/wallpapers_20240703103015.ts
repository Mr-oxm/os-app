import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const wallpaperDir = path.join(process.cwd(), 'public', 'wallpapers');
    const wallpapers = fs.readdirSync(wallpaperDir);
    return NextResponse.json({ wallpapers });
}