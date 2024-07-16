import { Loader2 } from "lucide-react";
import "../../globals.css"; 
const page = () => {
    return (
        <div className="bg-background  w-screen h-screen">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </div>
    )
}
export default page