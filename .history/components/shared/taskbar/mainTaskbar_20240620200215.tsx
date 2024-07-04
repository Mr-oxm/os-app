import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="dock">
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
        </div>
    )
}
