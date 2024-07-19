import Image from "next/image"

    import OXMIcon1 from "@/components/icons/OXMIcon1"
import { Label } from "@/components/ui/label"
const AboutSection = () => {
    return (
        <div className="flex flex-col p-1 gap-2 items-center justify-start">
            <div className="w-full h-32 flex flex-col gap-2">
                <OXMIcon1/>
                <Label>V1.1</Label>
            </div>
        </div>
    )
}
export default AboutSection