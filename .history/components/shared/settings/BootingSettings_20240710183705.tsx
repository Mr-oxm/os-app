"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useAppStore from '@/lib/Store/useAppStore' 
import { TaskbarIcons } from '@/lib/constants'
import Image from 'next/image'

const BootingSettings = () => {
    const { bootAnimation, setBootAnimation } = useAppStore();

    const themes = ['Mac', 'Windows', 'Linux']

    const getImageIndex = (theme:string) => {
        switch (theme) {
            case 'Mac': return 0;
            case 'Windows': return 1;
            case 'Linux': return 2;
            default: return 0;
        }
    }
    const logoComponents= [
        <span className="w-24 h-24">
            <Apple/>
        </span>,
        <Image 
                src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                alt="Start"
                width={200}
                height={200}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/1/1f/Gnu-linux_minimalistic_logo.svg'} 
                alt="Start"
                width={200}
                height={200}
                className="w-96 h-w-96"
        />,
    ]
    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Icons Theme</h2>
            <div className="flex flex-col gap-3 overflow-y-scroll p-1">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setIconsType(getImageIndex(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${iconsType === getImageIndex(t) ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                        <Image src={TaskbarIcons[0].imgSrc[getImageIndex(t)]} alt={t} width={50} height={50}/>
                        <Image src={TaskbarIcons[1].imgSrc[getImageIndex(t)]} alt={t} width={50} height={50}/>
                    </Button>
                ))}
            </div>
        </div>
    )
} 
export default BootingSettings