
import { useState, useEffect } from 'react';

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

export const useSettings = () => {
    const [settings, setSettings] = useState<SystemSettings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
        const response = await fetch('/api/settings');
        const data = await response.json();
        setSettings(data);
        };
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings: Partial<SystemSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
        });
        const data = await response.json();
        setSettings(data);
    };

    return { settings, updateSettings };
};