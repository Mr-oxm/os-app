"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useIconsStore  from '@/lib/Store/useIconsStore'
import { TaskbarIcons } from '@/lib/constants'
import Image from 'next/image'
const IconsPanel = () => {
    const { iconsType, setIconsType } = useAppStore();

    const themes = ['Mac', 'Windows', 'Linux']

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Icons Theme</h2>
            <div className="flex flex-col gap-3">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${theme === t  ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                        <Image src={TaskbarIcons[0].imgSrc[t]} alt={t} width={50} height={50}/>
                        <Image src={TaskbarIcons[1].imgSrc[t]} alt={t} width={50} height={50}/>
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default IconsPanel