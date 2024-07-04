import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="bg-white/50 backdrop-blur-lg w-full p-4 rounded-xl flex flex-row gap-2">
            <MainDesktopIcon hideName={}/>
            <MainDesktopIcon hideName={}/>
            <MainDesktopIcon hideName={}/>
            <MainDesktopIcon hideName={}/>
            <MainDesktopIcon hideName={}/>
        </div>
    )
}
