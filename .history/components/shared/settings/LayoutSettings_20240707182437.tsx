import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAppStore from "@/lib/Store/useAppStore";

const LayoutSettings = () => {
    const { taskbarType, setTaskbarType, topbarType, set } = useAppStore();

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
        <div className="flex flex-col w-full max-h-full">
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
            <h2 className="text-xl font-bold mb-4">Choose Topbar</h2>
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
        </div>
    )
}
export default LayoutSettings