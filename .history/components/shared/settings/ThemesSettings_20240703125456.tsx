"use client"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
const ThemesSettings = () => {
    const { setTheme } = useTheme() 
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Choose Wallpaper</h2>
            <Button onClick={() => setTheme("light")}>Light</Button>
            <Button onClick={() => setTheme("dark")}>Dark</Button> 
        </div>
    )
}



export default ThemesSettings