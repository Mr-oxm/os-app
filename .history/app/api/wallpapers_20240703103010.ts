import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const wallpaperDir = path.join(process.cwd(), 'public', 'wallpapers')
    const wallpapers = fs.readdirSync(wallpaperDir)
    res.status(200).json({ wallpapers })
}