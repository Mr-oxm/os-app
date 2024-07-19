import Image from "next/image"
import OXMIcon1 from "@/components/icons/OXMIcon1"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const AboutSection = () => {
    return (
        <div className="flex flex-col gap-4 ">
            <Card className="bg-card card ">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <Image 
                            src="https://media.licdn.com/dms/image/D4D03AQE_-rqnNSmyxw/profile-displayphoto-shrink_800_800/0/1691846370179?e=1726704000&v=beta&t=7wCbiYBEC3u8WqJhxk4Llw_6JqGeammule7HmuJ05xI" 
                            alt="Profile" 
                            width={120} 
                            height={120} 
                            className="rounded-full border-2 border-primary"
                        />
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold mb-2">Omar Emara</h2>
                            <p className="text-muted-foreground mb-4">Web Developer & Designer</p>
                            <div className="flex space-x-4 justify-center sm:justify-start">
                                <Link href="https://www.linkedin.com/in/omar-emara-5a114a249" target="_blank">
                                    <Button variant="outline" size="sm" className="flex items-center gap-2 card">
                                        <FaLinkedin className="text-primary" />
                                        <span>LinkedIn</span>
                                    </Button>
                                </Link>
                                <Link href="https://github.com/Mr-oxm/" target="_blank">
                                    <Button variant="outline" size="sm" className="flex gap-2 items-center card">
                                        <FaGithub className="text-primary" />
                                        <span>GitHub</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card card bgOpacity">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="w-32 h-32">
                            <OXMIcon1 />
                        </div>
                    </div>
                    <CardTitle className="text-center">OXM OS</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center mb-4">Version 1.0 | Built with Next.js</p>
                    <p className="text-foreground">
                        OXM OS is an innovative web-based operating system meticulously developed by me, Omar Emara, to demonstrate my expertise in web development and to serve as a dynamic portfolio. This project embodies my passion for creating versatile and user-friendly digital experiences. With OXM OS, users are empowered to personalize every aspect of their desktop environment. From selecting unique fonts to completely transforming the interface to mirror the aesthetics of today's most popular operating systems, OXM OS provides a seamless and engaging platform for customization. This endeavor not only highlights my technical skills but also my commitment to enhancing user experience through thoughtful design and functionality.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default AboutSection