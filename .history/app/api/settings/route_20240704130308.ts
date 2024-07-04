// pages/api/settings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

interface SystemSettings {
    firstboot: boolean;
    theme: 'light' | 'dark';
    wallpaper: string;
    iconsType: string;
    topbarType: string;
    taskbarType: string;
    mainbodyType: string;
    fontType: string;
    cursorType: string;
    bootAnimation: string;
}

const defaultSettings: SystemSettings = {
    firstboot: true,
    theme: 'light',
    wallpaper: 'w_1.jpg',
    iconsType: 'default',
    topbarType: 'default',
    taskbarType: 'default',
    mainbodyType: 'default',
    fontType: 'default',
    cursorType: 'default',
    bootAnimation: 'default',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cookieStore = cookies();
    const settingsCookie = cookieStore.get('systemSettings');
    
    if (settingsCookie) {
      res.status(200).json(JSON.parse(settingsCookie.value));
    } else {
      cookieStore.set('systemSettings', JSON.stringify(defaultSettings));
      res.status(200).json(defaultSettings);
    }
  } else if (req.method === 'POST') {
    const cookieStore = cookies();
    const newSettings = req.body;
    cookieStore.set('systemSettings', JSON.stringify(newSettings));
    res.status(200).json(newSettings);
  } else {
    res.status(405).end();
  }
}