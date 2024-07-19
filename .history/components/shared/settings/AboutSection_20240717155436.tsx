import Image from "next/image"

    import OXMIcon1 from "@/components/icons/OXMIcon1"
import { Label } from "@/components/ui/label"
const AboutSection = () => {
    return (
        <div className="flex flex-col p-1 gap-2 items-center justify-start">
            <div className="w-full h-32 flex flex-col gap-1 items-center card bgOpacity ">
                <Image 
                    src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Profile" 
                    width={1000} 
                    height={1000} 
                    className='w-10 h-10 !rounded-full !p-1 card bgOpacity transition-all ease-in-out hover:!bg-foreground/10'
                />
                <Label>Version: 1.0</Label>
            </div>
            <div className="w-full h-32 flex flex-col gap-1 items-center card bgOpacity ">
                <OXMIcon1/>
                <Label>Version: 1.0</Label>
            </div>
        </div>
    )
}
export default AboutSection