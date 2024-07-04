import MainDesktopIcon from "../desktopIcons/mainDesktopIcon";

const icons = [
    {
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/49bceb48dd145c3b3813033204ec47d7_79Y863vmNB.png",
        name: "Work"
    },
    {
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/03eff150f49a92733f924070c7ef9710_T0nAamycYI.png",
        name: "Wallpapers"
    },
    {
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/eddffe019686cec3f5a2ab0688e9b1c8_P82lWODEHL.png",
        name: "School"
    },
    {
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/603d0ef71252ee0d12081181dfd66041_FPDXUjhF0d.png",
        name: "Files"
    }
];

const mainDesktopBody = () => {
    return (
        <div className="w-full flex-1 grid grid-cols-12 grid-rows-5 gap-2">
            {icons.map((icon, index) => (
                <MainDesktopIcon key={index} imgSrc={icon.imgSrc} name={icon.name} />
            ))}
        </div>
    );
};

export default mainDesktopBody;
