"use client"
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,

} from "@/components/ui/navigation-menu"
import Apple from '@/components/icons/apple'

import {NavbarLinks}from "@/lib/constants" 
import Image from "next/image";
import useAppStore from "@/lib/Store/useAppStore";
import OXMIcon2 from "@/components/icons/OXMIcon2";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";


const macNavbar = () => { 
    const { iconsType } = useAppStore();
    const {active, openedPrograms}= useOSMemoryStore();

    const handleTitle= ()=>{
        const result = openedPrograms.find(program => program.id === active);
        if (result) {
            return result.name;
        } else {
            return 'Home';
        }
    }
    const macButtonIcons=[
        <span className="w-5 ">
            <Apple/>
        </span>,
        <Image 
            src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
            alt="Start"
            width={400}
            height={400}
            className="w-6 "
        />,
        <Image 
            src={'https://cdn.iconscout.com/icon/free/png-256/free-linux-3521549-2944967.png'} 
            alt="Start"
            width={400}
            height={400}
            className="w-6"
        />,
        <span className="w-5">
            <OXMIcon2/>
        </span>,
    ]
    return (
        <>
            <NavigationMenu className="h-full !text-xs">
                <NavigationMenuList className="flex flex-row p-0 h-full items-stretch">
                    {NavbarLinks.map((menu, i) => (
                        <NavigationMenuItem key={i}>
                            <NavigationMenuTrigger className={`capitalize bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40 ${menu.classname}`}>
                                {
                                    menu.Name==='Finder'? 
                                    (handleTitle())
                                    : 
                                    (menu.Name==='icon'? macButtonIcons[iconsType]:menu.Name)
                                }
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-2  w-screen md:w-[30rem]  text-foreground">
                                {menu.content.map((item, index) => (
                                    item.name !== 'separator' ?
                                        <NavigationMenuLink key={index}>
                                            <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-primary hover:!text-primary-foreground text-foreground"
                                                disabled={!item.disabled}>
                                                {item.name} {item.shortcut && <span className="ml-auto opacity-50">{item.shortcut}</span>}
                                            </Button>
                                        </NavigationMenuLink>
                                        :
                                        <hr className="border-foreground/15 mx-3 my-1" key={index} />
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}

export default macNavbar;
