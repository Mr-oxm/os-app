"use client"
import {Loader2 } from "lucide-react"; 
import Apple from "@/components/icons/apple";
import Image from "next/image";
import useAppStore from "@/lib/Store/useAppStore"; 
const Loading = () => {
    const { bootAnimation} = useAppStore()

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
                src={'https://brandslogos.com/wp-content/uploads/images/large/linux-tux-logo-1.png'} 
                alt="Start"
                width={200}
                height={200}
                className="w-24 h-w-24"
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