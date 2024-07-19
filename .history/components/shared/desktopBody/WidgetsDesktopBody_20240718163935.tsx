const WidgetComponent = ({ type }: { type: WidgetType }) => {
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

const SortableWidget = ({ id, type, size }: WidgetData) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        gridColumn: size === 'large' ? 'span 4' : size === 'medium' ? 'span 3' : 'span 2',
        gridRow: size === 'large' ? 'span 2' : size === 'medium' ? 'span 2' : 'span 1',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="h-full">
            <WidgetComponent type={type} />
        </div>
    );
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
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
            <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-8 md:grid-cols-12 auto-rows-[120px] gap-4 p-4 relative`}>
                {children}
                {widgets.map((widget) => (
                    <SortableWidget key={widget.id} {...widget} />
                ))}
            </div>
        </SortableContext> 
    );
};

export default MainDesktopBody;