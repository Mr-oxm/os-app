"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useAppStore from '@/lib/Store/useAppStore' 
import { TaskbarIcons } from '@/lib/constants'
import Image from 'next/image'
import Apple from '@/components/icons/apple'
import { ScrollArea } from '@/components/ui/scroll-area'

const BootingSettings = () => {
    const {fontType, setFontType } = useAppStore();

    const themes = ['font-sans', 'font-serif',"font-mono"] 

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Font Type</h2>
            <div className="flex flex-col gap-3 p-1">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setFontType(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${fontType === t ? 'ring-2 ring-primary' : ''}`}
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