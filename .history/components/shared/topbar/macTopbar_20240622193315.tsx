import Image from "next/image"
import apple from "@/components/icons/apple"
const macTopbar = () => {
    return (
        <div className="bg-black/15 backdrop-blur-sm w-full flex flex-row justify-between">
            <div>
                {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" width={20} height={20} alt="menu" className=" w-5 h-5"/> */}
                <Apple
            </div>
            <div>

            </div>
        </div>
    )
}
export default macTopbar