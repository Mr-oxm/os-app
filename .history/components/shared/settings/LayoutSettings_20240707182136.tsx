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
        <div>LayoutSettings</div>
    )
}
export default LayoutSettings