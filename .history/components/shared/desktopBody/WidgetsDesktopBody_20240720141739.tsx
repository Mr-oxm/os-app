import useAppStore from "@/lib/Store/useAppStore"; 
import WeatherWidget from "../widgets/WeatherWidget";
import ClockWidget from "../widgets/ClockWidget";
import MusicWidget from "../widgets/MusicWidget";
import { Calendar } from "@/components/ui/calendar";
import CalendarWidget from "../widgets/CalendarWidget";
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-8 grid-row gap-4 p-4 relative`}>
            {children}
            {/* widgets here */}
            <WeatherWidget />
            <ClockWidget />
            <CalendarWidget/>
            <div className="hidden md:block col-span-2 row-span-4"></div>
            <MusicWidget />
            <div className="hidden md:block col-span-2 row-span-4"></div>
        </div> 
    );
};

export default MainDesktopBody;