import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReactElement } from "react" 
import { settingsMenu } from "@/lib/constants"

const page = () => {
    return (
        <div className="flex flex-row w-full h-full p-3">
            <div className="flex flex-col gap-2 w-1/3">
                {settingsMenu.map(item=>(
                    <Setting name={item.name} icon={item.icon}/>
                ))}
            </div>
        </div>
    )
}

const Setting=({name, icon}:{name:string, icon:ReactElement})=>{
return(
    <Link href={name}> <Button className="w-full text-left flex flex-row gap-2 justify-start text-xs text-foreground card bgOpacity hover:!bg-primary hover:text-pr"><span className="w-3">{icon}</span>{name} </Button></Link>
)
}

export default page