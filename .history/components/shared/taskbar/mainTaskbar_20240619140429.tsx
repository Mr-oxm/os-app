import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="bg-black/15 backdrop-blu p-4 rounded-xl flex flex-row gap-2">
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
            <MainDesktopIcon hideName={false}/>
        </div>
    )
}
