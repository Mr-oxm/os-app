"use client"
import { Button } from "@/components/ui/button" 
import { ReactElement, useState } from "react" 
import { settingsMenu } from "@/lib/constants" 
import SettingsContent from "@/components/shared/settings/SettingsContent"
import { ScrollArea } from "@/components/ui/scroll-area"

const SettingsApp = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <div className="flex flex-row w-full h-full p-2 gap-2">
            <ScrollArea className="sm:w-1/6 md:w-1/3">
                <div className="!flex flex-col h-full !gap-1 w-full">
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
            </ScrollArea>
            <ScrollArea className="md:w-2/3 bgOpacity card h-full w-5/6">
                <SettingsContent index={selectedIndex}/>
            </ScrollArea>
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
                    : "text-foreground  bgOpacity hover:!bg-foreground/20 "
            }`}
            onClick={onClick}
        >
            <span>{icon}</span>
            <span className="hidden md:blcok">{name}</span> 
        </Button>
    )
} 
export default SettingsApp