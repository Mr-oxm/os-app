import MainDesktopIcon from "../desktopBody/desktopIcons/mainDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="bg-white/50 backdrop-blur-lg w-full p-4 rounded-xl">
            <MainDesktopIcon/>
            <MainDesktopIcon/>
            <MainDesktopIcon/>
            <MainDesktopIcon/>
            <MainDesktopIcon/>
        </div>
    )
}
