"use client"
import {Loader2 } from "lucide-react"; 
import Apple from "@/components/icons/apple";
import Image from "next/image";
import useAppStore from "@/lib/Store/useAppStore"; 
import { useEffect, useState } from "react";
const Loading = () => {
    const { bootAnimation} = useAppStore()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { 
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [])
    const logoComponents= [
        <span className="w-24 h-24">
            <Apple/>
        </span>,
        <Image 
                src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://brandslogos.com/wp-content/uploads/images/large/linux-tux-logo-1.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pop_OS-Logo-nobg.svg/2560px-Pop_OS-Logo-nobg.svg.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://cdn.freebiesupply.com/logos/large/2x/debian-2-logo-png-transparent.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Linux_Mint_logo_without_wordmark.svg/2048px-Linux_Mint_logo_without_wordmark.svg.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fedora_logo.svg/2048px-Fedora_logo.svg.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
        <Image 
                src={'https://cdn.freebiesupply.com/logos/large/2x/ubuntu-icon-logo-png-transparent.png'} 
                alt="Start"
                width={400}
                height={400}
                className="w-24 h-24"
        />,
    ]
    return (
        <div className="bg-background text-foreground w-screen h-screen flex flex-col items-center justify-center gap-6"> 
            {logoComponents[bootAnimation]}
            <Loader2 className=" h-6 w-6 animate-spin" /> 
        </div>
    )
} 
export default Loading