import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
import Apple from "@/components/icons/apple";
import Image from "next/image";
const page = () => {
    const logoComponents
    return (
        <div className="bg-background text-foreground w-screen h-screen flex flex-col items-center justify-center gap-6">
            <Image 
                src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                alt="Start"
                width={200}
                height={200}
                className="w-24 h-24"
            />
            {/* <span className="w-24 h-24">
                <Apple/>
            </span> */}
            <Loader2 className=" h-6 w-6 animate-spin" /> 
        </div>
    )
}
export default page