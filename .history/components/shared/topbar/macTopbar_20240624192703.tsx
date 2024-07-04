import Image from "next/image"
import Apple from "@/components/icons/apple"
import MacNavbar from "./macNavbar"
import MacRightbar from "./macRightbar"
import { Label } from "@/components/ui/label"
const macTopbar = () => {
    return (
        <div className="  w-full flex flex-row justify-between h-6  relative ">
            <div className="flex flex-row gap-2 items-center my-1 mx-6 z-20">
                {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" width={20} height={20} alt="menu" className=" w-5 h-5"/> */}
                <Apple/>
                <Label className="text-xs font-bold text-foreground ml-2">Finder</Label>
                <MacNavbar/>
            </div>
            <div>
                <Mac
            </div>
            {/* bg */}
            <div className="absolute bg-background/20 bg backdrop-blur-sm w-full h-full z-10"></div>
        </div>
    )
}
export default macTopbar