import dockDesktopIcon from "../desktopIcons/dockDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="dock">
            <dockDesktopIcon hideName={false}/>
            <dockDesktopIcon hideName={false}/>
            <dockDesktopIcon hideName={false}/>
            <dockDesktopIcon hideName={false}/>
            <dockDesktopIcon hideName={false}/>
        </div>
    )
}
