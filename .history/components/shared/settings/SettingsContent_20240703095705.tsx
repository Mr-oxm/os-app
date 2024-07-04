import ThemesSettings from "./ThemesSettings"
import WallpaperPanel from "./WallpaperPanel"

const SettingsContent = ({ index }: { index: number }) => {
    const components = [
        <ThemesSettings />,
        <WallpaperPanel />
    ]

    return (
        <div>
        {components[index] || <div>No component found for this index</div>}
        </div>
    )
}

export default SettingsContent