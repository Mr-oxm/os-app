"use client"
import { Button } from "@/components/ui/button" 
import { Label } from "@/components/ui/label"
import useAppStore from "@/lib/Store/useAppStore" 
import { useTheme } from "next-themes"
const ThemesSettings = () => {
    const { theme,setTheme } = useTheme() 
    const { sysTheme, setSysTheme, sysColor, setSysColor } = useAppStore() 

    const options= ['blue-theme', 'red-theme','green-theme','yellow-theme','purple-theme']

    const ThemeButton=({themeName}:{themeName:string})=>{return(
        <Button className={`text-xs !p-0 w-full h-fit flex flex-col justify-start ${themeName} text-foreground ${sysTheme===themeName? 'btn2-selected' : 'btn2'}`} onClick={() => {setTheme(themeName); setSysTheme(themeName);}}>
            <div className="bg-background p-2 capitalize w-full">
                {themeName}
            </div>
            <div className="bgOpacity p-2 capitalize w-full flex-grow ">
                <div className="flex flex-col gap-1 text-left bg-card card">
                    <span className="card bgOpacity !truncate">Normal choice</span>
                    <span className="card bg-primary !text-primary-foreground !truncate">Selected choice</span>
                </div>
            </div>
            
        </Button>
    )}
    return (
        <>
            <div className="h-full">
                <h2 className="text-xl font-bold mb-4 p-1">Choose Theme</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1 "> 
                    <ThemeButton themeName="light"/> 
                    <ThemeButton themeName="dark"/> 
                    {/* {systemThemes.map(theme=>(
                        <ThemeButton themeName={theme}/> 
                    ))} */}
                </div>
            </div>
            <h2 className="text-xl font-bold my-4 ">Choose Color</h2>
            <div className="flex flex-row gap-3 flex-wrap p-1">
                {options.map((option, index) => (
                    <Button
                        key={option}
                        onClick={() => {setSysColor(option)}}
                        className={` h-20 ${sysColor === option ? 'btn2-selected' : 'btn2'}`} 
                    >
                        <Label className='w-20 capitalize'>{option.split('-')[0]}</Label>
                    </Button>
                ))}
            </div>
        </>
    )
}



export default ThemesSettings