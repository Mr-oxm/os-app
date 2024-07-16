"use client"
import { Button } from "@/components/ui/button" 
import { ReactElement, useState } from "react" 
import { settingsMenu } from "@/lib/constants" 
import SettingsContent from "@/components/shared/settings/SettingsContent"

const Page = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <div className="flex flex-row w-full h-full p-2 gap-2">
            <div className="flex flex-col h-full gap-1 sm:w-1/6 md:w-1/3">
                {settingsMenu.map((item, index) => (
                    <Setting 
                        key={index}
                        name={item.name} 
                        icon={item.icon} 
                        onClick={() => setSelectedIndex(index)}
                        isSelected={selectedIndex === index}
                    />
                ))}
            </div> 
            <Scro className="md:w-2/3 bgOpacity card h-full w-5/6">
                <SettingsContent index={selectedIndex}/>
            </Scro>
        </div>
    )
}

const Setting = ({
    name, 
    icon, 
    onClick, 
    isSelected
}: {
    name: string, 
    icon: ReactElement, 
    onClick: () => void,
    isSelected: boolean
}) => {
    return (
        <Button 
            className={`w-full text-left flex flex-row gap-2 justify-start text-xs card ${
                isSelected 
                    ? "bg-primary !text-primary-foreground" 
                    : "text-foreground  bgOpacity hover:!bg-primary hover:!text-primary-foreground"
            }`}
            onClick={onClick}
        >
            <span>{icon}</span>{name} 
        </Button>
    )
} 

export default Page