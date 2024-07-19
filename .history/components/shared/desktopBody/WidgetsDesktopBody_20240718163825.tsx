"use client"
import { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, closestCenter, PointerSensor} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useAppStore from '@/lib/Store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type WidgetType = 'clock' | 'weather' | 'stockChart' | 'taskProgress' | 'newsHeadlines';

interface WidgetData {
    id: string;
    type: WidgetType;
    size: 'small' | 'medium' | 'large';
}

const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl font-bold">{time.toLocaleTimeString()}</div>
                <div className="text-lg">{time.toLocaleDateString()}</div>
            </CardContent>
        </Card>
    );
};

const WeatherWidget = () => {
    // In a real app, you'd fetch this data from a weather API
    const weatherData = { temp: 72, condition: 'Sunny', humidity: 45 };

    return (
        <Card className="bg-gradient-to-br from-yellow-300 to-orange-500 text-white">
            <CardHeader>
                <CardTitle>Weather</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{weatherData.temp}°F</div>
                <div className="text-xl">{weatherData.condition}</div>
                <div>Humidity: {weatherData.humidity}%</div>
            </CardContent>
        </Card>
    );
};

const StockChartWidget = () => {
    const data = [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Apr', value: 4500 },
        { name: 'May', value: 6000 },
    ];

    return (
        <Card className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
            <CardHeader>
                <CardTitle>Stock Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis stroke="#ffffff" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const TaskProgressWidget = () => {
    const tasks = [
        { name: 'Project A', progress: 75 },
        { name: 'Project B', progress: 30 },
        { name: 'Project C', progress: 90 },
    ];

    return (
        <Card className="bg-gradient-to-br from-pink-500 to-red-500 text-white">
            <CardHeader>
                <CardTitle>Task Progress</CardTitle>
            </CardHeader>
            <CardContent>
                {tasks.map((task, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                            <span>{task.name}</span>
                            <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const NewsHeadlinesWidget = () => {
    const headlines = [
        "Global Tech Conference Announces Breakthrough in AI",
        "New Environmental Policy Aims to Reduce Carbon Emissions",
        "Sports Team Wins Championship in Dramatic Overtime",
    ];

    return (
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardHeader>
                <CardTitle>News Headlines</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside">
                    {headlines.map((headline, index) => (
                        <li key={index} className="mb-2">{headline}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

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
        <DndContext>
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