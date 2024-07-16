import IconsPanel from "./IconsPanel"
import ThemesSettings from "./ThemesSettings"
import WallpaperPanel from "./WallpaperPanel"
import LayoutSettings from './LayoutSettings'

const SettingsContent = ({ index }: { index: number }) => {
    const components = [
        <ThemesSettings />,
        <WallpaperPanel />,
        <IconsPanel />,
        <LayoutSettings/>,
        <Tas
    ]

    return (
        <>
        {components[index] || <div>No component found for this index</div>}
        </>
    )
}

export default SettingsContent