import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAppStore from "@/lib/Store/useAppStore";

const LayoutSettings: React.FC = () => {
    const { taskbarType, setTaskbarType, topbarType, setTopbarType, windowType, setWindowType, windowDir, setWindowDir } = useAppStore();

    const renderButtons = (title: string, options: string[], type: number, setter: (index: number) => void) => (
        <>
            <h2 className="text-xl font-bold my-4">{title}</h2>
            <div className="flex flex-row gap-3 flex-wrap">
                {options.map((option, index) => (
                    <Button
                        key={option}
                        onClick={() => setter(index)}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${type === index ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{option}</Label>
                    </Button>
                ))}
            </div>
        </>
    );

    const themes: string[] = ['Mac', 'Windows', 'Linux'];
    const directions: string[] = ['Left', 'Right'];

    return (
        <div className="flex flex-col w-full max-h-full p-1">
            {renderButtons("Choose Taskbar", themes, taskbarType, setTaskbarType)}
            {renderButtons("Choose Topbar", themes, topbarType, setTopbarType)}
            {renderButtons("Choose Window Type", themes, windowType, setWindowType)}
            {renderButtons("Choose Window Direction", directions, windowDir, setWindowDir)}
        </div>
    );
};

export default LayoutSettings;