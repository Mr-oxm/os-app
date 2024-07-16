const TaskbarSettings = () => {
    const themes = ['Bottom', 'Right', 'Left']
    const getImageIndex = (theme: string) => {
        const index = themes.indexOf(theme);
        return index !== -1 ? index : 0;
    }
    return (
        <div>TaskbarSettings</div>
    )
}
export default TaskbarSettings