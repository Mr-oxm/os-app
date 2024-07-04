import { useState } from "react"
import { Button } from "@/components/ui/button" 
import { ReactElement } from "react" 
import { settingsMenu } from "@/lib/constants"
import SettingsContent from "@/components/shared/settings/SettingsContent"
import { getWallpapers } from "@/components/shared/settings/WallpaperPanel"

export async function getServerSideProps() {
    const wallpapers = await getWallpapers();
    return {
        props: {
        wallpapers,
        },
    };
}

const Page = ({ wallpapers }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentWallpaper, setCurrentWallpaper] = useState('w_1.jpg');

    const handleSelectWallpaper = (wallpaper: string) => {
        setCurrentWallpaper(wallpaper);
        // You might want to save this selection to a database or local storage here
    };

    return (
        <div className={`flex flex-row w-full h-full p-2 gap-2 bg-cover bg-center bg-[url('/wallpapers/${currentWallpaper}')]`}>
            <div className="flex flex-col h-full gap-1 w-1/3">
                {settingsMenu.map((item, index) => (
                    <Setting 
                        key={item.name} 
                        name={item.name} 
                        icon={item.icon} 
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div> 
            <div className="flex-grow bgOpacity card h-full">
                <SettingsContent 
                    index={selectedIndex} 
                    wallpapers={wallpapers}
                    onSelectWallpaper={handleSelectWallpaper}
                />
            </div>
        </div>
    )
}

const Setting = ({ name, icon, onClick }: { name: string, icon: ReactElement, onClick: () => void }) => {
    return (
        <Button 
            className="w-full text-left flex flex-row gap-2 justify-start text-xs text-foreground card bgOpacity hover:!bg-primary hover:!text-primary-foreground"
            onClick={onClick}
        >
            <span>{icon}</span>{name} 
        </Button>
    )
} 

export default Page