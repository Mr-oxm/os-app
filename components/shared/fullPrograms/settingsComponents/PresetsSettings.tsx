"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useAppStore from '@/lib/Store/useAppStore' 
import Image from 'next/image'
import Apple from '@/components/icons/apple' 
import OXMIcon1 from '@/components/icons/OXMIcon1'

const PresetsSettings = () => {
    const { setTaskbarType, setTopbarType, setTaskbarDir, setIconsType, setBootAnimation, setWindowType, setWindowDir, setWallpaper, sysTheme, setTaskbarPos } = useAppStore();

    const themes = ['Mac', 'Windows', 'Linux','OXM OS']

    const getImageIndex = (theme: string) => {
        const index = themes.indexOf(theme);
        return index !== -1 ? index : 0;
    }
    const handlePreset=(index:number)=>{
        setTaskbarType(index);
        setTopbarType(index);
        setIconsType(index);
        setWindowType(index); 
        setBootAnimation(index);
        setTaskbarPos(0);
        (index===0)? setWindowDir(0):setWindowDir(1);
        (index===2)? setTaskbarDir(2):setTaskbarDir(0);
        switch (index) {
            case 0: 
                (sysTheme==='dark')?
                setWallpaper('mac_1.jpg'):
                setWallpaper('mac_2.jpg');
                break;
            case 1:
                (sysTheme==='dark')?
                setWallpaper('windows_1.jpg'):
                setWallpaper('windows_2.jpg');
                break;
            case 2:
                (sysTheme==='dark')?
                setWallpaper('w_6.jpg'):
                setWallpaper('w_8.jpg');
                break;
            case 3:
                (sysTheme==='dark')?
                setWallpaper('os_1.png'):
                setWallpaper('os_4.png');
                break;
            default:
                (sysTheme==='dark')?
                setWallpaper('os_1.png'):
                setWallpaper('os_4.png');
                break;
        }
    }
    const logoComponents= [
        <span className="w-14 h-14">
            <Apple/>
        </span>,
        <Image 
                src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-14"
        />,
        <Image 
                src={'https://brandslogos.com/wp-content/uploads/images/large/linux-tux-logo-1.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
        <span className="w-14 h-14">
            <OXMIcon1/>
        </span>,
    ]
    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4 p-1">Choose Desktop Preset</h2>
            <div className="flex flex-col gap-3 p-1">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => handlePreset(getImageIndex(t))}
                        className={`h-20 overflow-hidden btn2`}
                    >
                        <Label className='w-20'>{t}</Label>
                        {logoComponents[getImageIndex(t)]}
                    </Button>
                ))}
            </div>
        </div>
    )
} 
export default PresetsSettings