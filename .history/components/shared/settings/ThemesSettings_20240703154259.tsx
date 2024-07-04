"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import MacWindow from "../windows/macWindow"
const ThemesSettings = () => {
    const { setTheme } = useTheme() 
    const ThemeButton=({themeName}:{themeName:string})=>{return(
        <Button className={`card bgOpacity cursor-pointer flex flex-col ${themeName} text-foreground`} onClick={() => setTheme(themeName)}>
            <div className="bg-background p-2 cap">
                {themeName}
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