import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
import Apple from "@/components/icons/apple";
const page = () => {
    return (
        <div className="bg-background text-foreground w-screen h-screen flex flex-col items-center justify-center gap-4">
            <>
                <Apple/>
            </>
            <Loader2 className=" h-12 w-12 animate-spin" /> 
        </div>
    )
}
export default page