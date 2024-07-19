const WidgetComponent = () => {
    switch (type) {
        case 'clock':
            return <ClockWidget />;
        case 'weather':
            return <WeatherWidget />;
        case 'stockChart':
            return <StockChartWidget />;
        case 'taskProgress':
            return <TaskProgressWidget />;
        case 'newsHeadlines':
            return <NewsHeadlinesWidget />;
        default:
            return <div>Unknown Widget</div>;
    }
}; 

const MainDesktopBody = ({children}:any) => {
    const [widgets, setWidgets] = useState<WidgetData[]>([
        { id: '1', type: 'clock', size: 'small' },
        { id: '2', type: 'weather', size: 'medium' },
        { id: '3', type: 'stockChart', size: 'large' },
        { id: '4', type: 'taskProgress', size: 'medium' },
        { id: '5', type: 'newsHeadlines', size: 'large' },
    ]);

    const { taskbarDir } = useAppStore();
    

    return ( 
        <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-8 md:grid-cols-12 auto-rows-[120px] gap-4 p-4 relative`}>
            {children}
            {widgets.map((widget) => (
                <SortableWidget key={widget.id} {...widget} />
            ))}
        </div> 
    );
};

export default MainDesktopBody;