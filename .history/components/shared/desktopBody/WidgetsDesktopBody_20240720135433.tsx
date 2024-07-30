import useAppStore from "@/lib/Store/useAppStore"; 
import WeatherWidget from "../widgets/WeatherWidget";
import ClockWidget from "../widgets/ClockWidget";
import MusicWidget from "../widgets/MusicWidget";
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-8   gap-4 p-4 relative`}>
            {children}
            {/* widgets here */}
            <WeatherWidget />
            <ClockWidget />
            <MusicWidget />
        </div> 
    );
};

export default MainDesktopBody;