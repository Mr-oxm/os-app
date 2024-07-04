import DockDesktopIcon from "../desktopIcons/dockDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="dock">
            <DockDesktopIcon hideName={false}/>
            <DockDesktopIcon hideName={false}/>
            <DockDesktopIcon hideName={false}/>
            <DockDesktopIcon hideName={false}/>
            <DockDesktopIcon hideName={false}/>
        </div>
    )
}
