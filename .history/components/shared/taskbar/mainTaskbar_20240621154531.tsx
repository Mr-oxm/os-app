import DockDesktopIcon from "../desktopIcons/dockDesktopIcon"
export default function mainTaskbar() {
    return (
        <div className="dock">
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/884c8c0cc7a505ac50339c9552263524_B7DXS2NKpM.png" name="Finder" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/580889ee3811c11886dc163ee59b9d92_V7Od0GfbVh.png" name="launchpad" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/2daefe2173c9ccc78a108eb9dd805565_eJCDM3QFYI.png" name="Terminal" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/66c7ae19964613c774a3751916d496b3_yNBo22mIIb.png" name="Settings" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/f4c0c6c2336b6433aaf11ed6353769d0_low_res_Calculator.png" name="Settings" hideName={false}/>
            <DockDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/db1241171cb324621c222ad116d80972_f8Y65N7lzM.png" name="Trash" hideName={false}/>

        </div>
    )
}
