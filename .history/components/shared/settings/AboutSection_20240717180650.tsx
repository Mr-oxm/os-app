import Image from "next/image"

import OXMIcon1 from "@/components/icons/OXMIcon1"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
const AboutSection = () => {
    return (
        <div className="flex flex-col p-1 gap-2 items-center justify-start">
            <div className="w-full flex flex-col items-center card bgOpacity ">
                <Image 
                    src="https://media.licdn.com/dms/image/D4D03AQE_-rqnNSmyxw/profile-displayphoto-shrink_800_800/0/1691846370179?e=1726704000&v=beta&t=7wCbiYBEC3u8WqJhxk4Llw_6JqGeammule7HmuJ05xI" 
                    alt="Profile" 
                    width={750} 
                    height={750} 
                    className='w-32 h-32 !rounded-full !p-1 card bgOpacity transition-all ease-in-out hover:!bg-foreground/10'
                /> 
                <Label className="!text-lg !font-thin">Developed By</Label>
                <Label className="!text-lg !font-bold">Omar Emara</Label>
                <Link target="_blank"  href="https://www.linkedin.com/in/omar-emara-5a114a249">
                    <Button  className="card bgOpacity hover:!bg-foreground/15 mt-2">Linkedin Profile</Button>
                </Link>
            </div>
            <div className="w-full flex flex-col gap-1 items-center card bgOpacity ">
                <div className="h-28 w-full">
                    <OXMIcon1/>
                </div>
                <Label className="text-primary mb-4">
                    Version: 1.0,
                    <Label className=" ml-1">Built Using NextJs</Label>
                </Label>
                <p className="text-center">OXM OS is an innovative web-based operating system meticulously developed by me, Omar Emara, to demonstrate my expertise in web development and to serve as a dynamic portfolio. This project embodies my passion for creating versatile and user-friendly digital experiences. With OXM OS, users are empowered to personalize every aspect of their desktop environment. From selecting unique fonts to completely transforming the interface to mirror the aesthetics of today's most popular operating systems, OXM OS provides a seamless and engaging platform for customization. This endeavor not only highlights my technical skills but also my commitment to enhancing user experience through thoughtful design and functionality.</p>
            </div>
        </div>
    )
}
export default AboutSection