import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const MainLockScreen = ({ wallpaper, setIsLocked }: { wallpaper: string; setIsLocked: Function }) => {
    const [isUnlocking, setIsUnlocking] = useState(false);

    useEffect(() => {
        if (isUnlocking) {
            const timer = setTimeout(() => {
                setIsLocked(false);
            }, 500); // Match this to the animation duration
            return () => clearTimeout(timer);
        }
    }, [isUnlocking, setIsLocked]);

    return (
        <div className={`fixed inset-0 transition-opacity duration-500 ${isUnlocking ? 'opacity-0' : 'opacity-100'}`}>
            <main 
                className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center animate-fadeIn`}
                style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
            >
                <div className='bgOpacity bgblur w-full h-full flex flex-col items-center gap-4 justify-center'>
                    <div className="animate-slideDown">
                        <Image 
                            src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Profile" 
                            width={1000} 
                            height={1000} 
                            className='w-52 h-52 !rounded-full card bgOpacity transition-transform duration-300 hover:scale-105'
                        />
                    </div>
                    <Label className='text-2xl font-bold text-foreground animate-fadeIn'>Guest</Label>
                    <Button 
                        onClick={() => setIsUnlocking(true)} 
                        className='bgBlur bgOpacity text-foreground w-24 card hover:!bg-primary act:!text-primary-foreground transition-all ease-in-out active: active:scale-110 animate-fadeIn'
                    >
                        Enter
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default MainLockScreen;