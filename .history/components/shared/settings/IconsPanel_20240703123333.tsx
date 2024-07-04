"use client"
import { Button } from '@/components/ui/button'
import useIconsStore  from '@/lib/Store/useIconsStore'
import { TaskbarIcons } from '@/lib/constants'
const IconsPanel = () => {
    const { theme, setTheme } = useIconsStore()

    const themes = ['Mac', 'Windows', 'Linux']

    return (
        <div className="flex flex-col w-full max-h-full">
            <h2 className="text-xl font-bold mb-4">Choose Icons Theme</h2>
            <div className="flex flex-col gap-3">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden ${theme === t  ? 'ring-2 ring-primary' : ''}`}
                    >
                        {t}
                        <Image src={TaskbarIcons[0]}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default IconsPanel