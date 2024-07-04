import MainDesktopIcon from "../desktopIcons/dockDesktopIcon"
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
