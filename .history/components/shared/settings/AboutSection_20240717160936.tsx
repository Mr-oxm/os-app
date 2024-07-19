import Image from "next/image"

import OXMIcon1 from "@/components/icons/OXMIcon1"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
const AboutSection = () => {
    return (
        <div className="flex flex-col p-1 gap-2 items-center justify-start">
            <div className="w-full flex flex-col gap-1 items-center card bgOpacity ">
                <Image 
                    src="https://media.licdn.com/dms/image/D4D03AQE_-rqnNSmyxw/profile-displayphoto-shrink_800_800/0/1691846370179?e=1726704000&v=beta&t=7wCbiYBEC3u8WqJhxk4Llw_6JqGeammule7HmuJ05xI" 
                    alt="Profile" 
                    width={750} 
                    height={750} 
                    className='w-32 h-32 !rounded-full !p-1 card bgOpacity transition-all ease-in-out hover:!bg-foreground/10'
                /> 
                <Label className="!text-xs !font-thin">Developed By</Label>
                <Label className="!text-lg !font-bold">Omar Emara</Label>
                <Link target="_blank"  href="https://www.linkedin.com/in/omar-emara-5a114a249">
                    <Button  className="card bgOpacity hover:!bg-foreground/15">Linkedin Profile</Button>
                </Link>
            </div>
            <div className="w-full h-32 flex flex-col gap-1 items-center card bgOpacity ">
                <OXMIcon1/>
                <Label>Version: 1.0</Label>
            </div>
        </div>
    )
}
export default AboutSection