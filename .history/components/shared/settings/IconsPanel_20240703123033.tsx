"use client"
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
                    <B
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`p-2 rounded ${theme === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                    >
                        {t}
                    </B>
                ))}
            </div>
        </div>
    )
}

export default IconsPanel