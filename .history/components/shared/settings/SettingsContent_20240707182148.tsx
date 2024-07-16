import IconsPanel from "./IconsPanel"
import ThemesSettings from "./ThemesSettings"
import WallpaperPanel from "./WallpaperPanel"
LayoutSettings

const SettingsContent = ({ index }: { index: number }) => {
    const components = [
        <ThemesSettings />,
        <WallpaperPanel />,
        <IconsPanel />,
    ]

    return (
        <>
        {components[index] || <div>No component found for this index</div>}
        </>
    )
}

export default SettingsContent