import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"
const mainDesktopBody = () => {
    return (
        <div className=" w-full flex-1 grid grid-cols-12 grid-rows-5 gap-2">
            <MainDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/49bceb48dd145c3b3813033204ec47d7_79Y863vmNB.png" name="Work"/>    
            <MainDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/03eff150f49a92733f924070c7ef9710_T0nAamycYI.png" name="Wallpapers"/>    
            <MainDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/eddffe019686cec3f5a2ab0688e9b1c8_P82lWODEHL.png" name="School"/>    
            <MainDesktopIcon imgSrc="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/603d0ef71252ee0d12081181dfd66041_FPDXUjhF0d.png" name="Files"/>
            <div className="bg-red-500/50 backdrop-blur-sm w-full h-full ">
                <div className="bg-blue-500/50 backdrop-blur-3xl w-1/2 h-1/2">a</div>
            </div>
        </div>
    )
}
export default mainDesktopBody