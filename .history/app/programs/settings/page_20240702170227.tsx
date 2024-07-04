import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReactElement } from "react"

const page = () => {
    return (
        <div className="flex w-full h-full">
            <div className="fled fle"></div>
        </div>
    )
}

const setting=({name, icon}:{name:string, icon:ReactElement})=>{
return(
    <Link href={name}> <Button>{name} <span>{icon}</span></Button>o</Link>
)
}

export default page