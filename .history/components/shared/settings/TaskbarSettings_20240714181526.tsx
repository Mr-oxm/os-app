import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAppStore from "@/lib/Store/useAppStore";

const TaskbarSettings = () => {
    const { taskbarDir, setTaskbarDir, taskbarPos, setTaskbarPos, taskbarType } = useAppStore();
    const directions = ['Bottom', 'Right', 'Left']
    const positions = ['Sticky', 'Hidden']
    const getImageIndex = (theme: string, array:any) => {
        const index = array.indexOf(theme);
        return index !== -1 ? index : 0;
    }
    if(taskbarType===3) setTaskbarPos(0)
    return (
        <div className="flex flex-col w-full max-h-full p-1">
            {/* taskbar direction  */}
            <h2 className="text-xl font-bold mb-4">Choose Taskbar Direction</h2>
            <div className="flex flex-row gap-3 flex-wrap">
                {directions.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setTaskbarDir(getImageIndex(t, directions))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${taskbarDir === getImageIndex(t, directions) ? 'ring-2 ring-primary' : ''}`}
                        disabled={taskbarPos===1}
                    >
                        <Label className='w-20'>{t}</Label>
                    </Button>
                ))}
            </div>
            {/* taskbat postion */}
            <h2 className="text-xl font-bold my-4">Choose Taskbar Position</h2>
            <div className="flex flex-row gap-3 flex-wrap">
                {positions.map((t) => (
                    <Button
                        key={t}
                        onClick={() => {setTaskbarPos(getImageIndex(t, positions)); setTaskbarDir(0)}}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${taskbarPos === getImageIndex(t, positions) ? 'ring-2 ring-primary' : ''}`}
                        disabled={taskbarType===3}
                    >
                        <Label className='w-20'>{t}</Label>
                    </Button>
                ))}
            </div>
        </div>
    )
}
export default TaskbarSettings