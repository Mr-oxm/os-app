import Image from "next/image"
import Apple from "@/components/icons/apple"
import MacNavbar from "./macNavbar"
import MacRightbar from "./macRightbar"
import { Label } from "@/components/ui/label"
const macTopbar = () => {
    return (
        <div className="  w-full flex flex-row justify-between h-6  relative z-50">
            <div className="flex flex-row items-center ml-3 z-20"> 
                <MacNavbar/>
            </div>
            <div className="mr-6 z-20">
                <MacRightbar/>
            </div>
            {/* bg */}
            <div className="absolute bgOpacity bg bgblur w-full h-full z-10"></div>
        </div>
    )
}
export default macTopbar