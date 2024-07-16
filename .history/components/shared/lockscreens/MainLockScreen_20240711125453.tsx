import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const MainLockScreen = () => {
    return (
        <main 
            className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center`}
            style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
        >
            <div className='bgOpacity bgblur w-full h-full flex flex-col items-center gap-4 justify-center'>
                <Image src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" width={1000} height={1000} className='w-52 h-52 !rounded-full card bgOpacity '/>
                <Label className='text-2xl font-bold text-foreground'>Guest</Label>
                <Button onClick={()=>{setIsLocked(false)}} className='bgBlur bgOpacity text-foreground w-24  card hover:!bg-primary hover:!text-primary-foreground'>Enter</Button>
            </div>
        </main>
    )
}
export default MainLockScreen