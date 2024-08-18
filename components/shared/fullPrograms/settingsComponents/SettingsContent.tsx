import IconsPanel from "./IconsPanel"
import ThemesSettings from "./ThemesSettings"
import WallpaperPanel from "./WallpaperPanel"
import LayoutSettings from './LayoutSettings'
import BootingSettings from "./BootingSettings" 
import FontSettings from "./FontSettings"
import PresetsSettings from "./PresetsSettings"
import AboutSection from "./AboutSection"

const SettingsContent = ({ index }: { index: number }) => {
    const components = [
        ThemesSettings,
        WallpaperPanel,
        IconsPanel,
        LayoutSettings,
        BootingSettings,
        FontSettings,
        PresetsSettings,
        AboutSection,
    ]

    const Component = components[index];
    return (
        <>
        {<Component/> || <div>No component found for this index</div>}
        </>
    )
}

export default SettingsContent