"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
const ThemesSettings = () => {
    const { setTheme } = useTheme() 
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

const ThemeButton=({themeName}:{themeName:string})=>{return(
    <Button className={`card bgOpacity ${themeName} text-foreground`} onClick={() => setTheme(themeName)}>
        <Label>Light</Label>
    </Button>
)}


export default ThemesSettings