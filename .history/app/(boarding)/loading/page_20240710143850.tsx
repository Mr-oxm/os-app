"use client"
import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
import Apple from "@/components/icons/apple";
import Image from "next/image";
import useAppStore from "@/lib/Store/useAppStore";
import { useEffect } from "react";
import { redirect } from "next/navigation";
const page = () => {
    const { bootAnimation, firstboot, setFirstboot} = useAppStore()
    useEffect(() => { 
        const timer = setTimeout(() => {
            setFirstboot(false)
            redirect
        }, 1000) 
    }, [firstboot])
    const logoComponents= [
        <span className="w-24 h-24">
            <Apple/>
        </span>,
        <Image 
                src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                alt="Start"
                width={200}
                height={200}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/1/1f/Gnu-linux_minimalistic_logo.svg'} 
                alt="Start"
                width={200}
                height={200}
                className="w-96 h-w-96"
        />,
    ]
    return (
        <div className="bg-background text-foreground w-screen h-screen flex flex-col items-center justify-center gap-6"> 
            {logoComponents[bootAnimation]}
            <Loader2 className=" h-6 w-6 animate-spin" /> 
        </div>
    )
}
export default page