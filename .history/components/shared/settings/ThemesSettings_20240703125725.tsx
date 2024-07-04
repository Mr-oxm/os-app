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
                <Button className="card bgOpacity" onClick={() => setTheme("light")}>
                    <Label>Light</Label>
                </Button>
                <Button onClick={() => setTheme("dark")}>Dark</Button> 
            </div>
        </div>
    )
}



export default ThemesSettings