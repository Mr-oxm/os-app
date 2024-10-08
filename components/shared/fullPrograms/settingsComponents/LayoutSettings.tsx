import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAppStore from "@/lib/Store/useAppStore";

const LayoutSettings: React.FC = () => {
    const { taskbarType, setTaskbarType, topbarType, setTopbarType, windowType, setWindowType, windowDir, setWindowDir, setTaskbarPos, setMainbodyType, mainbodyType, taskbarDir, taskbarPos, setTaskbarDir } = useAppStore();

    const renderButtons = (title: string, options: string[], type: number, setter: (index: number) => void, disabled?:any) => (
        <>
            <h2 className="text-xl font-bold ">{title}</h2>
            <div className="flex flex-row gap-3 flex-wrap">
                {options.map((option, index) => (
                    <Button
                        key={option}
                        onClick={() => {setter(index);if(option==='OXM OS'&& title.includes('Taskbar')) setTaskbarPos(0);}}
                        className={` h-20  ${type === index ? 'btn2-selected' : 'btn2'}`}
                        disabled={disabled}
                    >
                        <Label className='w-20'>{option}</Label>
                    </Button>
                ))}
            </div>
        </>
    );

    const themes: string[] = ['Mac', 'Windows', 'Linux','OXM OS'];
    const directions: string[] = ['Left', 'Right'];
    const desktops: string[] = ['Icons', 'Widgets'];
    const taskDirections = ['Bottom', 'Right', 'Left']
    const positions = ['Sticky', 'Hidden']

    const handleTaskbarPos= (index:number)=>{
        setTaskbarPos(index);
        setTaskbarDir(0);
    }
    const handleTaskbar= (index:number)=>{
        setTaskbarType(index);
        if(index==3)
            setTaskbarPos(0);
    }
    return (
        <div className="flex flex-col w-full gap-4 max-h-full p-1">
            <h2 className="text-xl font-bold ">Desktop</h2>
            <div className='bgOpacity card flex flex-col w-full gap-4'> 
                {renderButtons("Choose Desktop Type", desktops, mainbodyType, setMainbodyType)}
            </div>
            <h2 className="text-xl font-bold ">Taskbar</h2>
            <div className='bgOpacity card flex flex-col w-full gap-4'> 
                {renderButtons("Choose Taskbar", themes, taskbarType, handleTaskbar)} 
                {renderButtons("Choose Taskbar Position", taskDirections, taskbarDir, setTaskbarDir, taskbarPos===1)} 
                {renderButtons("Choose Taskbar Position", positions, taskbarPos, handleTaskbarPos, taskbarType===3)} 
            </div> 
            <h2 className="text-xl font-bold ">Topbar</h2>
            <div className='bgOpacity card flex flex-col w-full gap-4'> 
                {renderButtons("Choose Topbar", themes, topbarType, setTopbarType)}
            </div>
            <h2 className="text-xl font-bold ">Window</h2>
            <div className='bgOpacity card flex flex-col w-full gap-4'> 
                {renderButtons("Choose Window Type", themes, windowType, setWindowType)}
                {renderButtons("Choose Window Direction", directions, windowDir, setWindowDir)} 
            </div>
        </div>
    );
};

export default LayoutSettings;