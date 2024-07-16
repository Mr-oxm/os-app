import useAppStore from "@/lib/Store/useAppStore";

const TaskbarSettings = () => {
    const {  } = useAppStore();
    const directions = ['Bottom', 'Right', 'Left']
    const getImageIndex = (theme: string) => {
        const index = directions.indexOf(theme);
        return index !== -1 ? index : 0;
    }
    return (
        <div className="flex flex-col w-full max-h-full p-1">
            <h2 className="text-xl font-bold mb-4">Choose Taskbar</h2>
            <div className="flex flex-row gap-3 flex-wrap">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setTaskbarType(getImageIndex(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${taskbarType === getImageIndex(t) ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                    </Button>
                ))}
            </div>
                
    )
}
export default TaskbarSettings