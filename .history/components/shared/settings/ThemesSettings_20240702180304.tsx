"use client"
import { useTheme } from "next-themes"
const ThemesSettings = () => {
    const { setTheme } = useTheme()
    return (
        <div>
            <Button>Light</Button>
        </div>
    )
}
export default ThemesSettings