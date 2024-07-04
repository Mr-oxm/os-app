import MainDesktopIcon from "./desktopIcons/mainDesktopIcon"
const mainDesktopBody = () => {
    return (
        <div className=" w-full flex-1 grid grid-cols-6 grid-rows-4">
            <MainDesktopIcon/>    
            <MainDesktopIcon/>    
            <MainDesktopIcon/>    
            <MainDesktopIcon/>    
        </div>
    )
}
export default mainDesktopBody