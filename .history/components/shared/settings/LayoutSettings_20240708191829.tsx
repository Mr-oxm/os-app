import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAppStore from "@/lib/Store/useAppStore";

const LayoutSettings = () => {
    const { taskbarType, setTaskbarType, topbarType, setTopbarType, windowType, setWindowType, windowDir, setWindowDir } = useAppStore();

    const themes = ['Mac', 'Windows', 'Linux']

    const getImageIndex = (theme:string) => {
        switch (theme) {
            case 'Mac': return 0;
            case 'Windows': return 1;
            case 'Linux': return 2;
            default: return 0;
        }
    }
    return (
        <div className="flex flex-col w-full max-h-full over">
            <h2 className="text-xl font-bold mb-4">Choose Taskbar</h2>
            <div className="flex flex-row gap-3">
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
            <h2 className="text-xl font-bold my-4">Choose Topbar</h2>
            <div className="flex flex-row gap-3">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setTopbarType(getImageIndex(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${topbarType === getImageIndex(t) ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                    </Button>
                ))}
            </div>
            <h2 className="text-xl font-bold my-4">Choose Window Type</h2>
            <div className="flex flex-row gap-3">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setWindowType(getImageIndex(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${windowType === getImageIndex(t) ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                    </Button>
                ))}
            </div>
            <h2 className="text-xl font-bold my-4">Choose Window Direction</h2>
            <div className="flex flex-row gap-3">
                <Button 
                    onClick={() => setWindowDir(0)}
                    className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${windowDir === 0 ? 'ring-2 ring-primary' : ''}`}
                >
                    <Label className='w-20'>Left</Label>
                </Button> 
                <Button 
                    onClick={() => setWindowDir(1)}
                    className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${windowDir === 1 ? 'ring-2 ring-primary' : ''}`}
                >
                    <Label className='w-20'>Right</Label>
                </Button> 
            </div>
        </div>
    )
}
export default LayoutSettings