"use client"
import { useState } from 'react';
import { DndContext, useSensor, useSensors, closestCenter, PointerSensor} from '@dnd-kit/core';
import {  arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"; 

const iconsData = [
    {
        id: "work",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/49bceb48dd145c3b3813033204ec47d7_79Y863vmNB.png",
        name: "Work"
    },
    {
        id: "wallpapers",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/03eff150f49a92733f924070c7ef9710_T0nAamycYI.png",
        name: "Wallpapers"
    },
    {
        id: "school",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/eddffe019686cec3f5a2ab0688e9b1c8_P82lWODEHL.png",
        name: "School"
    },
    {
        id: "files",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/603d0ef71252ee0d12081181dfd66041_FPDXUjhF0d.png",
        name: "Files"
    }
];

const SortableItem = ({ id, imgSrc, name }:{id:string|number, imgSrc:string}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <MainDesktopIcon imgSrc={imgSrc} name={name} />
        </div>
    );
};

const MainDesktopBody = () => {
    const [items, setItems] = useState(iconsData.map(icon => icon.id));

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="w-full flex-1 grid grid-cols-12 grid-rows-5 gap-2">
                    {items.map((id) => {
                        const icon = iconsData.find(icon => icon.id === id);
                        return <SortableItem key={id} id={id} imgSrc={icon.imgSrc} name={icon.name} />;
                    })}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default MainDesktopBody;
