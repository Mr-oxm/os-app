const TaskbarSettings = () => {
    
    const directions = ['Bottom', 'Right', 'Left']
    const getImageIndex = (theme: string) => {
        const index = directions.indexOf(theme);
        return index !== -1 ? index : 0;
    }
    return (
        <div>TaskbarSettings</div>
    )
}
export default TaskbarSettings