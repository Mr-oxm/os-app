"use client"
import { AppleIcon, Loader2 } from "lucide-react";
import "../../globals.css"; 
import Apple from "@/components/icons/apple";
import Image from "next/image";
import useAppStore from "@/lib/Store/useAppStore";
import { useEffect } from "react";
const page = () => {
    const { bootAnimation} = useAppStore()
    useEffect(() => {
        if (!firstboot) {
            redirect('/loading')
        } else {
            // Simulate a delay to ensure all components are loaded
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 1000) // Adjust the delay as needed

            return () => clearTimeout(timer)
        }
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