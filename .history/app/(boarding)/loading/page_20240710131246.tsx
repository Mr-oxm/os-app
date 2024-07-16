import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
const page = () => {
    return (
        <div className="bg-background text-foreground w-screen h-screen">
            <div className="flex flex-col item">
                
                <Loader2 className=" h-20 w-20 animate-spin" />
                
            </div>
        </div>
    )
}
export default page