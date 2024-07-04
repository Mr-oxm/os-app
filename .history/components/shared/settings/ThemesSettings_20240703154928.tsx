"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import MacWindow from "../windows/macWindow"
const ThemesSettings = () => {
    const { theme,setTheme } = useTheme() 
    const ThemeButton=({themeName}:{themeName:string})=>{return(
        <Button className={`overflow-hidden !p-0 card bgOpacity w-1/5 h-48 cursor-pointer flex flex-col justify-start ${themeName} text-foreground hover:ring-2 ${theme===themeName? 'ring-2 ring-primary': ''}`} onClick={() => setTheme(themeName)}>
            <div className="bg-background p-2 capitalize w-full">
                {themeName}
            </div>
            <div className="bgOpacity p-2 capitalize w-full flex-grow">
                <span>Test</span>
            </div>
            
        </Button>
    )}
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Choose Theme</h2>
            <div className="flex flex-row gap-2">
                <ThemeButton themeName="light"/>
                <ThemeButton themeName="dark"/>  
            </div>
        </div>
    )
}



export default ThemesSettings