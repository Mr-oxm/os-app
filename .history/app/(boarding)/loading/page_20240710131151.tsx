import { Loader2 } from "lucide-react";
import "../../globals.css"; 
const page = () => {
    return (
        <div className="bg-background text-foreground w-screen h-screen">
            <Loader2 className="mr-2 h-20 w-20 animate-spin" />
            Please wait
        </div>
    )
}
export default page