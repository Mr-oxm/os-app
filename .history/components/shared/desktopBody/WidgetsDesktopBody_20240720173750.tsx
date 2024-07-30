import useAppStore from "@/lib/Store/useAppStore"; 
import WeatherWidget from "../widgets/WeatherWidget";
import ClockWidget from "../widgets/ClockWidget";
import MusicWidget from "../widgets/MusicWidget"; 
import CalendarWidget from "../widgets/CalendarWidget";
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : "flex-grow"} flex flex-row relative flex-wrap just`}>
            {children}
            <WeatherWidget />
            <ClockWidget />
            <CalendarWidget/>  
            <div className="h-1/2 w-4/6 m-auto">
                <MusicWidget /> 
            </div>
        </div> 
    );
};

export default MainDesktopBody;