import DockDesktopIcon from "../desktopIcons/dockDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="dock">
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/884c8c0cc7a505ac50339c9552263524_B7DXS2NKpM.png" name="Finder" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/884c8c0cc7a505ac50339c9552263524_B7DXS2NKpM.png" name="Finder" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/2daefe2173c9ccc78a108eb9dd805565_eJCDM3QFYI.png" name="Terminal" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/66c7ae19964613c774a3751916d496b3_yNBo22mIIb.png" name="Settings" hideName={false}/>

        </div>
    )
}
