const LayoutSettings = () => {
    const { iconsType, setIconsType } = useAppStore();

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