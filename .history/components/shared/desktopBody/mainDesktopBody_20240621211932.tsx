import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"
const mainDesktopBody = () => {
    return (
        <div className=" w-full flex-1 grid grid-cols-3 grid-rows-3 gap-2">
            <MainDesktopIcon/>    
            <MainDesktopIcon/>    
            <MainDesktopIcon/>    
            <MainDesktopIcon/>    
        </div>
    )
}
export default mainDesktopBody