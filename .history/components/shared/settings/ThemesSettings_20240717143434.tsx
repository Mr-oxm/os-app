"use client"
import { Button } from "@/components/ui/button" 
import useAppStore from "@/lib/Store/useAppStore" 
import { useTheme } from "next-themes"
const ThemesSettings = () => {
    const { theme,setTheme } = useTheme() 
    const { sysTheme, setSysTheme } = useAppStore() 

    const ThemeButton=({themeName}:{themeName:string})=>{return(
        <Button className={`overflow-hidden text-xs !p-0 card bgOpacity w-full md:w-2/5 h-fit cursor-pointer flex flex-col justify-start ${themeName} text-foreground hover:ring-2 ${sysTheme===themeName? 'ring-2 ring-primary': ''}`} onClick={() => {setTheme(themeName); setSysTheme(themeName);}}>
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
        <div className="h-full">
            <h2 className="text-xl font-bold mb-4 p-1">Choose Theme</h2>
            <div className="flex flex-col md:flex-row flex-wrap gap-2 p-1 "> 
                <ThemeButton themeName="light"/> 
                <ThemeButton themeName="dark"/> 
                {/* {systemThemes.map(theme=>(
                    <ThemeButton themeName={theme}/> 
                ))} */}
            </div>
        </div>
    )
}



export default ThemesSettings