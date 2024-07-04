"use client"
import { Button } from "@/components/ui/button" 
import useThemeStore from "@/lib/Store/useThemeStore"
import { systemThemes } from "@/lib/constants"
const ThemesSettings = () => {

    const { color,setColor } = useThemeStore() 
    const ThemeButton=({themeName}:{themeName:string})=>{return(
        <Button className={`overflow-hidden text-xs !p-0 card bgOpacity w-1/5 h-fit cursor-pointer flex flex-col justify-start ${themeName} text-foreground hover:ring-2 ${color===themeName? 'ring-2 ring-primary': ''}`} onClick={() => setColor(themeName)}>
            <div className="bg-background p-2 capitalize w-full">
                {themeName}
            </div>
            <div className="bgOpacity p-2 capitalize w-full flex-grow ">
                <div className="flex flex-col gap-1 text-left bg-card card">
                    <span className="card bgOpacity">Normal choice</span>
                    <span className="card bg-primary !text-primary-foreground">Selected choice</span>
                </div>
            </div>
            
        </Button>
    )}
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Choose Theme</h2>
            <div className="flex flex-row gap-2"> 
                {systemThemes.map(theme)}
                <ThemeButton themeName="light"/>
                <ThemeButton themeName="dark"/>  
            </div>
        </div>
    )
}



export default ThemesSettings