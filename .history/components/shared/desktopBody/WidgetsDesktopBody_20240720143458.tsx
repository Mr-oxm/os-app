import useAppStore from "@/lib/Store/useAppStore"; 
import WeatherWidget from "../widgets/WeatherWidget";
import ClockWidget from "../widgets/ClockWidget";
import MusicWidget from "../widgets/MusicWidget"; 
import CalendarWidget from "../widgets/CalendarWidget";
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "flex-grow" : ""} auto-rows-[120px] flex-1 grid grid-cols-8 grid-rows-4 p-4 relative`}>
            {children}
            {/* widgets here */}
            <WeatherWidget />
            <ClockWidget />
            <CalendarWidget/>
            <div className="hidden md:block col-span-2 row-span-2"></div>
            <MusicWidget />
            <div className="hidden md:block col-span-2 row-span-2"></div>
        </div> 
    );
};

export default MainDesktopBody;