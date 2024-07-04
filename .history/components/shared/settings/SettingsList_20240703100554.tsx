"use client"

import { Button } from "@/components/ui/button"
import { ReactElement } from "react"
import { settingsMenu } from "@/lib/constants"
import { useRouter, useSearchParams } from 'next/navigation'

export const SettingsList = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedIndex = parseInt(searchParams.get('index') || '0')

    const handleClick = (index: number) => {
        router.push(`?index=${index}`)
    }

    return (
        <>
            {settingsMenu.map((item, index) => (
                <Setting 
                    key={index}
                    name={item.name} 
                    icon={item.icon} 
                    onClick={() => handleClick(index)}
                    isSelected={selectedIndex === index}
                />
            ))}
        </>
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
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground bgOpacity hover:!bg-primary hover:!text-primary-foreground"
            }`}
            onClick={onClick}
        >
            <span>{icon}</span>{name} 
        </Button>
    )
} 