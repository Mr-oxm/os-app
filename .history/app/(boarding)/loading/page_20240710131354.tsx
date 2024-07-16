import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
const page = () => {
    return (
        <div className="bg-background text-foreground w-screen h-screen flex flex-col items-center justify-center gap-4">
            <Loader2 className=" h-20 w-20 animate-spin" /> 
        </div>
    )
}
export default page