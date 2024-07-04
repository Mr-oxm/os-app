// hooks/useCookie.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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

export const useCookie = () => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  useEffect(() => {
    const cookieData = Cookies.get('systemSettings');
    if (cookieData) {
      setSettings(JSON.parse(cookieData));
    } else {
      Cookies.set('systemSettings', JSON.stringify(defaultSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    Cookies.set('systemSettings', JSON.stringify(updatedSettings));
  };

  return { settings, updateSettings };
};