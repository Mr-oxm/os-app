import useAppStore from "@/lib/Store/useAppStore"; 
import WeatherWidget from "../widgets/WeatherWidget";
import ClockWidget from "../widgets/ClockWidget";
import MusicWidget from "../widgets/MusicWidget"; 
import CalendarWidget from "../widgets/CalendarWidget";
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : "flex-grow"} flex flex-col relative`}>
            {children}
            {/* widgets here */}
            <div className="grid grid-cols-3 h-1/2">
                <WeatherWidget />
                <ClockWidget />
                <CalendarWidget/>
            </div> 
            <div className="h-1/2 ">
                <MusicWidget /> 
            </div>
        </div> 
    );
};

export default MainDesktopBody;