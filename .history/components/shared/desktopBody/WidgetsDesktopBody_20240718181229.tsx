import useAppStore from "@/lib/Store/useAppStore"; 
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-8 md:grid-cols-12 auto-rows-[120px] gap-4 p-4 relative`}>
            {children}
            import useAppStore from "@/lib/Store/useAppStore";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import ClockWidget from "@/components/widgets/ClockWidget";
import MusicWidget from "@/components/widgets/MusicWidget";

const MainDesktopBody = ({ children }: any) => {
  const { taskbarDir } = useAppStore();

  return (
    <div
      className={`w-full ${
        taskbarDir ? "h-full" : ""
      } flex-1 grid grid-cols-8 md:grid-cols-12 auto-rows-[120px] gap-4 p-4 relative`}
    >
      {children}
      <WeatherWidget />
      <ClockWidget />
      <MusicWidget />
      {/* Add more widgets here */}
    </div>
  );
};

export default MainDesktopBody;
        </div> 
    );
};

export default MainDesktopBody;