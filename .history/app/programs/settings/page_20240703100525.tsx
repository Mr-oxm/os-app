import SettingsList from '@/components/shared/'
import SettingsContent from "@/components/shared/settings/SettingsContent"

export default function Page() {
    return (
        <div className="flex flex-row w-full h-full p-2 gap-2">
            <div className="flex flex-col h-full gap-1 w-1/3">
                <SettingsList />
            </div> 
            <div className="flex-grow bgOpacity card h-full">
                <SettingsContent />
            </div>
        </div>
    )
}