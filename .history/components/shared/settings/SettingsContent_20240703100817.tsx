import { settingsMenu } from "@/lib/constants"

const SettingsContent = async ({ searchParams }: { searchParams: { index?: string } }) => {
    const index = parseInt(searchParams.index || '0')
    const SelectedComponent = settingsMenu[index]?.component || (() => <div>No component found for this index</div>)

    return <SelectedComponent />
}

export default SettingsContent