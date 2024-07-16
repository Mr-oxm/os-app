import IconsPanel from "./IconsPanel"
import ThemesSettings from "./ThemesSettings"
import WallpaperPanel from "./WallpaperPanel"
import LayoutSettings from './LayoutSettings'
import BootingSettings from "./BootingSettings"
import TaskbarSettings from "./TaskbarSettings"

const SettingsContent = ({ index }: { index: number }) => {
    const components = [
        <ThemesSettings />,
        <WallpaperPanel />,
        <IconsPanel />,
        <LayoutSettings/>,
        <TaskbarSettings/>,
        <BootingSettings/>
    ]

    return (
        <>
        {components[index] || <div>No component found for this index</div>}
        </>
    )
}

export default SettingsContent