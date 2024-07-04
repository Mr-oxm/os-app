import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody";
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar";
import MacTopbar from "@/components/shared/topbar/macTopbar";

const FullDesktop=({children}:{children:any})=>{
    const [showWallpaperPanel, setShowWallpaperPanel] = useState(false);
    const [currentWallpaper, setCurrentWallpaper] = useState('wallpaper'); 
    const handleSelectWallpaper = (wallpaper: string) => {
      setCurrentWallpaper(`bg-[url('/wallpapers/${wallpaper}')]`);
        setShowWallpaperPanel(false);
    };
    return(
        <main className="flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden">
            <MacTopbar/>
            <MainDesktopBody children={children}/>
            <MainTaskbar/>
        </main>
    )
}

export default FullDesktop