import dynamic from 'next/dynamic';

const SettingsContent = ({ index }: { index: number }) => {
    const componentNames = [
        "ThemesSettings",
        "WallpaperPanel",
        "IconsPanel",
        "LayoutSettings",
        "BootingSettings",
        "FontSettings",
        "PresetsSettings",
        "AboutSection",
    ];

    const Component = dynamic(() => import(`./${componentNames[index]}`), {
        loading: () =><h2 className="text-xl font-bold mb-4 p-1">Loading...</h2>
        ,
    });

    return (
        <>
            {index >= 0 && index < componentNames.length ? (
                <Component />
            ) : (
                <div>No component found for this index</div>
            )}
        </>
    );
};

export default SettingsContent;