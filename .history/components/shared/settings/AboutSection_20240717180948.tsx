import Image from "next/image"
import OXMIcon1 from "@/components/icons/OXMIcon1"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const AboutSection = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 text-white">
                <div className="flex items-center space-x-6">
                    <Image 
                        src="https://media.licdn.com/dms/image/D4D03AQE_-rqnNSmyxw/profile-displayphoto-shrink_800_800/0/1691846370179?e=1726704000&v=beta&t=7wCbiYBEC3u8WqJhxk4Llw_6JqGeammule7HmuJ05xI" 
                        alt="Profile" 
                        width={120} 
                        height={120} 
                        className="rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Omar Emara</h2>
                        <p className="text-xl mb-4">Web Developer & Designer</p>
                        <div className="flex space-x-4">
                            <Link href="https://www.linkedin.com/in/omar-emara-5a114a249" target="_blank">
                                <Button className="flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-100">
                                    <FaLinkedin />
                                    <span>LinkedIn</span>
                                </Button>
                            </Link>
                            <Link href="https://github.com/Mr-oxm/" target="_blank">
                                <Button className="flex items-center space-x-2 bg-white text-gray-800 hover:bg-gray-200">
                                    <FaGithub />
                                    <span>GitHub</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="flex justify-center mb-6">
                    <div className="w-48 h-48">
                        <OXMIcon1 />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">OXM OS</h3>
                <p className="text-gray-600 mb-4 text-center">Version 1.0 | Built with Next.js</p>
                <p className="text-gray-800 leading-relaxed">
                    OXM OS is an innovative web-based operating system meticulously developed to showcase my expertise in web development. This dynamic portfolio project embodies my passion for creating versatile and user-friendly digital experiences. With OXM OS, users can personalize every aspect of their desktop environment, from unique fonts to complete interface transformations mirroring today's most popular operating systems. This endeavor highlights my technical skills and commitment to enhancing user experience through thoughtful design and functionality.
                </p>
            </div>
        </div>
    )
}

export default AboutSection