"use client"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect } from "react"
const ThemesSettings = () => {
    const { ,setTheme } = useTheme()
    useEffect(() => {
        
        return () => {
            
        };
    }, []);
    return (
        <div>
            <Button onClick={() => setTheme("light")}>Light</Button>
            <Button onClick={() => setTheme("dark")}>Dark</Button>
            <Button onClick={() => setTheme("windowslight")}>windowslight</Button>
            <Button onClick={() => setTheme("windowsdark")}>windowsdark</Button>
            <Button onClick={() => setTheme("myCustomTheme")}>myCustomTheme</Button>
        </div>
    )
}



export default ThemesSettings