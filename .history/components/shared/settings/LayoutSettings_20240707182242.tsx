import useAppStore from "@/lib/Store/useAppStore";

const LayoutSettings = () => {
    const { taskbarType, setTaskbarType } = useAppStore();

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
            <h2 className="text-xl font-bold mb-4">Choose Icons Theme</h2>
            <div className="flex flex-col gap-3">
                {themes.map((t) => (
                    <Button
                        key={t}
                        onClick={() => setIconsType(getImageIndex(t))}
                        className={`card bgOpacity cursor-pointer h-20 overflow-hidden hover:ring-2 ${iconsType === getImageIndex(t) ? 'ring-2 ring-primary' : ''}`}
                    >
                        <Label className='w-20'>{t}</Label>
                        <Image src={TaskbarIcons[0].imgSrc[getImageIndex(t)]} alt={t} width={50} height={50}/>
                        <Image src={TaskbarIcons[1].imgSrc[getImageIndex(t)]} alt={t} width={50} height={50}/>
                    </Button>
                ))}
            </div>
        </div>
    )
}
export default LayoutSettings