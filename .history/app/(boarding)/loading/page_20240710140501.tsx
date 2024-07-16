import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
import Apple from "@/components/icons/apple";
const page = () => {
    return (
        <div className="bg-background text-foreground w-screen h-screen flex flex-col items-center justify-center gap-6">
            {/* <span className="w-24 h-24">
                <Apple/>
            </span> */}
            <Loader2 className=" h-6 w-6 animate-spin" /> 
        </div>
    )
}
export default page