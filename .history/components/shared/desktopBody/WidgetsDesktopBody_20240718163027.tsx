"use client"
import { useState } from 'react';
import { DndContext, useSensor, useSensors, closestCenter, PointerSensor} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useAppStore from '@/lib/Store/useAppStore';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Define widget types
type WidgetType = 'clock' | 'weather' | 'todo' | 'calendar' | 'notes';

interface WidgetData {
    id: string;
    type: WidgetType;
    size: 'small' | 'medium' | 'large';
}

// Sample widget components (you'll need to create these)
const ClockWidget = () => (
    <Card className="p-4">
        <h3 className="text-lg font-semibold">Clock</h3>
        {/* Implement clock logic here */}
    </Card>
);

const WeatherWidget = () => (
    <Card className="p-4">
        <h3 className="text-lg font-semibold">Weather</h3>
        {/* Implement weather logic here */}
    </Card>
);

// Add more widget components as needed

const WidgetComponent = ({ type }: { type: WidgetType }) => {
    switch (type) {
        case 'clock':
            return <ClockWidget />;
        case 'weather':
            return <WeatherWidget />;
        // Add cases for other widget types
        default:
            return <div>Unknown Widget</div>;
    }
};

const SortableWidget = ({ id, type, size }: WidgetData) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        gridColumn: size === 'large' ? 'span 3' : size === 'medium' ? 'span 2' : 'span 1',
        gridRow: size === 'large' ? 'span 2' : 'span 1',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <WidgetComponent type={type} />
        </div>
    );
};

const WidgetsDesktopBody = ({children}:any) => {
    const [widgets, setWidgets] = useState<WidgetData[]>([
        { id: '1', type: 'clock', size: 'small' },
        { id: '2', type: 'weather', size: 'medium' },
        // Add more initial widgets as needed
    ]);

    const { taskbarDir } = useAppStore();
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event:any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setWidgets((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
                <div className={`w-full ${taskbarDir ? "h-full" : ""} flex-1 grid grid-cols-6 md:grid-cols-12 auto-rows-[100px] gap-4 p-4 relative`}>
                    {children}
                    {widgets.map((widget) => (
                        <SortableWidget key={widget.id} {...widget} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default WidgetsDesktopBody;