import { Button } from "@/components/ui/button" 
import { ReactElement } from "react" 
import { settingsMenu } from "@/lib/constants"
import ThemesSettings from "@/components/shared/settings/ThemesSettings"


const page = () => {
    return (
        <div className="flex flex-row w-full h-full p-2 gap-2">
            <div className="flex flex-col h-full gap-1 w-1/3">
                {settingsMenu.map(item=>(
                    <Setting name={item.name} icon={item.icon}/>
                ))}
            </div> 
            <div className="flex-grow bg-background card h-full">
                <ThemesSettings/>
            </div>
        </div>
    )
}

const Setting=({name, icon}:{name:string, icon:ReactElement})=>{
return(
    <Button className="w-full text-left flex flex-row gap-2 justify-start text-xs text-foreground card bg-background hover:!bg-primary hover:!text-primary-foreground"><span>{icon}</span>{name} 
    </Button>
)
} 



export default page