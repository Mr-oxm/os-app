import Link from "next/link"
import { ReactElement } from "react"

const page = () => {
    return (
        <div>
        </div>
    )
}

const setting=({name, icon}:{name:string, icon:ReactElement})=>{
return(
    <Link href={name}></Link>
)
}

export default page