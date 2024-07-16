"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useAppStore from '@/lib/Store/useAppStore' 
import { TaskbarIcons } from '@/lib/constants'
import Image from 'next/image'
import Apple from '@/components/icons/apple'
import { ScrollArea } from '@/components/ui/scroll-area'

const BootingSettings = () => {
    const { bootAnimation, setBootAnimation } = useAppStore();

    const themes = ['font-sans']

    const getImageIndex = (theme: string) => {
        const index = themes.indexOf(theme);
        return index !== -1 ? index : 0;
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
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pop_OS-Logo-nobg.svg/2560px-Pop_OS-Logo-nobg.svg.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
        <Image 
                src={'https://cdn.freebiesupply.com/logos/large/2x/debian-2-logo-png-transparent.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
        <Image 
                src={'https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Linux_Mint_logo_without_wordmark.svg/2048px-Linux_Mint_logo_without_wordmark.svg.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fedora_logo.svg/2048px-Fedora_logo.svg.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
        <Image 
                src={'https://cdn.freebiesupply.com/logos/large/2x/ubuntu-icon-logo-png-transparent.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-14 h-w-14"
        />,
    ]
    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Boot Logo</h2>
            <div className="flex flex-col gap-3 p-1">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setBootAnimation(getImageIndex(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${bootAnimation === getImageIndex(t) ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                        {logoComponents[getImageIndex(t)]}
                    </Button>
                ))}
            </div>
        </div>
    )
} 
export default BootingSettings