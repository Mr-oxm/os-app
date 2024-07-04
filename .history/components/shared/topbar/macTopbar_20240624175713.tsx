import Image from "next/image"
import Apple from "@/components/icons/apple"
import MacNavbar from "./macNavbar"
import { Label } from "@/components/ui/label"
const macTopbar = () => {
    return (
        <div className="bg-black/15 bg  w-full flex flex-row justify-between h-6 py-1 px-6">
            <div className="flex flex-row gap-2">
                {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" width={20} height={20} alt="menu" className=" w-5 h-5"/> */}
                <Apple/>
                <Label className="text-xs font-bold text-white">Finder</Label>
                <MacNavbar/>
            </div>
            <div>

            </div>
        </div>
    )
}
export default macTopbar