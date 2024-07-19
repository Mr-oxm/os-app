import useAppStore from "@/lib/Store/useAppStore"; 
const MainDesktopBody = ({children}:any) => { 
    const { taskbarDir } = useAppStore(); 

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-8 md:grid-cols-12 auto-rows-[120px] gap-4 p-4 relative`}>
            {children}
            {/* widgets here */}
        </div> 
    );
};

export default MainDesktopBody;