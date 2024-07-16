import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card" 
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const MainLockScreen = ({ wallpaper, setIsLocked }: { wallpaper: string, setIsLocked: Function }) => {
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    return (
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            <div className='w-full h-full flex flex-col items-center justify-between p-8 bg-black/30 backdrop-blur-md transition-all duration-500'>
                <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg transition-all duration-300 hover:bg-white/20">
                    <Clock />
                    <div className="text-2xl text-white mb-4">
                        {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </Card>

                <div className='flex flex-col items-center gap-6 animate-fade-in-up'>
                    <Avatar className="w-40 h-40 border-4 border-white/50 shadow-lg transition-all duration-300 hover:scale-105">
                        <Image 
                            src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Profile" 
                            width={160} 
                            height={160} 
                            className='object-cover'
                        />
                    </Avatar>
                    <Label className='text-3xl font-bold text-white tracking-wide'>Guest</Label>
                    <Button 
                        onClick={() => setIsLocked(false)} 
                        className='bg-white/20 text-white w-32 rounded-full backdrop-blur-md transition-all duration-300 hover:bg-white/40 hover:scale-105 focus:ring-2 focus:ring-white/50'
                    >
                        Unlock
                    </Button>
                </div>

                <Card className="w-full max-w-md p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" className="text-white hover:bg-white/20">
                            Emergency
                        </Button>
                        <Separator orientation="vertical" className="h-8 bg-white/30" />
                        <Button variant="ghost" className="text-white hover:bg-white/20">
                            Shut Down
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
    )
}

export default MainLockScreen


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