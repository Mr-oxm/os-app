import { Popover, PopoverTrigger } from "@/components/ui/popover";
import useAppStore from "@/lib/Store/useAppStore";
import { ChevronUp, Volume2, Wifi } from "lucide-react";
import Image from "next/image";

const LinuxTopbar = () => {
    const { iconsType, setIconsType, taskbarDir, taskbarPos } = useAppStore();
    return (
        <div className={` bg-background/80 backdrop-blur-md  flex ${taskbarDir===0? "flex-row max-h-14 px-2 w-screen py-1 border-t border-border":"flex-col h-full w-14 px-1 py-2 border-x border-border"} items-center justify-center md:justify-between ${taskbarPos===0?"":"rounded-2xl w-[95vw]"}`}> 
                <div className={`hidden md:flex justify-start ${taskbarDir===0? "w-1/5 flex-row":"h-1/5 flex-col"}`}>
                </div>

                {/* Center Icons */}
                <div className={`flex ${taskbarDir===0? "flex-row h-full":"flex-col w-full justify-center"} items-center h-full gap-1`}>
                    {/* Start Menu */}
                    <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="p-2 border-transparent border hover:border-accent/25 hover:hover:bg-accent/40 w-11 h-11">
                                <Image 
                                    src={'https://preview.redd.it/ne6ukkej06t71.png?width=640&crop=smart&auto=webp&s=47bfffc51d6b6445538bc4c44410c816c6287091'} 
                                    alt="Start"
                                    width={200}
                                    height={200}
                                    className="w-6 h-6"
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit mx p-4 rounded-lg  bg-background/80 backdrop-blur-md mb-3" side="top">
                            <div className="grid grid-rows-3 gap-4 w-full">
                                <div className="col-span-2 w-full">
                                    <Input placeholder="Type here to search" className="mb-4 rounded-full w-full" />
                                    <h3 className="mb-2 font-semibold">Pinned</h3>
                                    <div className="flex flex-row gap-2 h-24 w-full">
                                        {TaskbarIcons.map((icon, index) => (
                                            <Link href={icon.route} 
                                                onClick={() => handleClick(index)}
                                                className="w-1/6 h-20"
                                            > 
                                                <Button variant="ghost" className={`p-6 border-transparent w-full h-full  group border hover:border-accent/25 hover:bg-accent/40 flex flex-col`}  onClick={() => handleClick(index)}>
                                                    <Image 
                                                        src={icon.imgSrc[iconsType]} 
                                                        alt={icon.name} 
                                                        width={200}
                                                        height={200}
                                                        className="w-12 h-12 transition-all group-active:h-8 group-active:w-8"
                                                    />
                                                    <span className="text-xs">{icon.name}</span>
                                                </Button> 
                                            </Link> 
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">Recommended</h3> 
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover> 
                    {TaskbarIcons.map((icon, index) => (
                        <Link href={icon.route} 
                            onClick={() => handleClick(index)}
                        > 
                            <Button variant="ghost" className={`p-1.5 border-transparent w-11 h-11 group border hover:border-accent/25 hover:bg-accent/40 ${
                                activeIndex === index ? 'bg-accent/40 border-accent/25' : 'hover:bg-accent/40'
                            }`} >
                                <Image 
                                    src={icon.imgSrc[iconsType]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-full h-full transition-all group-active:h-5 group-active:w-5"
                                />
                            </Button> 
                        </Link> 
                    ))}
                </div>

                {/* Right-side Icons */}
                <div className={`hidden md:flex ${taskbarDir===0? "flex-row w-1/5 h-full":"flex-col h-1/5 w-full"} justify-end`}> 
                    <Popover>
                        <PopoverTrigger>
                            {/* System Tray */}
                            <div className={`p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex ${taskbarDir===0? "flex-row h-full":"flex-col w-full"} gap-2  items-center rounded-md`}>
                                <ChevronUp className="w-4 h-4" />
                                <Wifi className="w-4 h-4" />
                                <Volume2 className="w-4 h-4" />
                                <Battery className="w-4 h-4" />
                            </div> 
                        </PopoverTrigger>
                        <SystemTrayMenu/>
                    </Popover>


                    
                </div> 
        </div>
    )
}
export default LinuxTopbar