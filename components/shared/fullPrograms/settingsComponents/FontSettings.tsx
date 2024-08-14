"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useAppStore from '@/lib/Store/useAppStore' 

const FontSettings = () => {
    const {fontType, setFontType } = useAppStore();

    const themes = ['font-sans', 'font-serif',"font-mono","font-style-script","font-six-caps"] 

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4 p-1">Choose Font Type</h2>
            <div className="flex flex-col gap-3 p-1">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setFontType(t)}
                        className={` h-20  ${t} ${fontType === t ? 'btn2-selected' : 'btn2'}`}
                    >
                        <Label className='w-20'>{t}</Label> 
                    </Button>
                ))}
            </div>
        </div>
    )
} 
export default FontSettings