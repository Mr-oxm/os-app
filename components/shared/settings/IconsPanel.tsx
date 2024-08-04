"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useAppStore from '@/lib/Store/useAppStore' 
import { SystemAppsIcons } from '@/lib/constants'
import Image from 'next/image'

const IconsPanel = () => {
    const { iconsType, setIconsType } = useAppStore();

    const themes = ['Mac', 'Windows', 'Linux', "OXM OS"]

    const getImageIndex = (theme:string) => {
        switch (theme) {
            case 'Mac': return 0;
            case 'Windows': return 1;
            case 'Linux': return 2;
            case 'OXM OS':return 3;
            default: return 0;
        }
    }

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4 p-1">Choose Icons Theme</h2>
            <div className="flex flex-col gap-3 p-1">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setIconsType(getImageIndex(t))}
                        className={`h-20  flex gap-2 ${iconsType === getImageIndex(t) ? 'btn2-selected' : 'btn2'}`}
                    >
                        <Label className='w-20'>{t}</Label>
                        <Image src={SystemAppsIcons[0].imgSrc[getImageIndex(t)]} alt={t} width={50} height={50}/>
                        <Image src={SystemAppsIcons[1].imgSrc[getImageIndex(t)]} alt={t} width={50} height={50}/>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default IconsPanel