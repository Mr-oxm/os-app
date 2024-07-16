import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image"; 
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

const MainLockScreen = ({ wallpaper, setIsLocked }: { wallpaper: string; setIsLocked: Function }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main
        className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out`}
        style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
        <div className='bgOpacity bgblur w-full h-full flex flex-col items-center justify-between p-8'>
            <div className="flex flex-col items-center space-y-4 animate-fadeIn">
            <Clock  className="text-6xl font-bold text-foreground" />
            <Calendar
                mode="single"
                selected={currentTime}
                className="rounded-lg bgOpacity p-2"
            />
            </div>

            <div className='flex flex-col items-center gap-4 animate-slideUp'>
            <Image
                src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Profile"
                width={1000}
                height={1000}
                className='w-52 h-52 !rounded-full card bgOpacity transition-transform duration-300 hover:scale-105'
            />
            <Label className='text-2xl font-bold text-foreground'>Guest</Label>
            <Button
                onClick={() => { setIsLocked(false) }}
                className='bgBlur bgOpacity text-foreground w-24 card hover:!bg-primary hover:!text-primary-foreground transition-all duration-300 hover:shadow-lg'
            >
                Enter
            </Button>
            </div>

            <div className="flex justify-between w-full animate-fadeIn">
            <Badge variant="secondary" className="bgOpacity">
                Wi-Fi: Connected
            </Badge>
            <Badge variant="secondary" className="bgOpacity">
                Battery: 85%
            </Badge>
            </div>
        </div>
        </main>
    );
};

export default MainLockScreen;


export const Clock = () => {
    const [time, setTime] = useState(new Date())
  
    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000)
      return () => clearInterval(timer)
    }, [])
  
    return (
      <div className="text-6xl font-bold text-white mb-2 font-mono">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    )
  }