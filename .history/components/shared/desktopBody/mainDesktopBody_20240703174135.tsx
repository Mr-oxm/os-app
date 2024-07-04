"use client"
import { useState } from 'react';
import { DndContext, useSensor, useSensors, closestCenter, PointerSensor} from '@dnd-kit/core';
import {  arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"; 
import { Underdog } from 'next/font/google';
import {DesktopIcons} from '@/lib/constants'


const SortableItem = ({ id, imgSrc, name }:{id:string|number, imgSrc:string, name:string}) => {
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

const MainDesktopBody = ({children}:any) => {
    const [items, setItems] = useState(DesktopIcons.map(icon => icon.id));

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event:any) => {
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
            <div className="w-full flex-1 grid grid-cols-12 grid-rows-5 gap-2 relative">
              {children}
              {items.map((id) => {
                const icon = iconsData.find(icon => icon.id === id) as IconData;
                return <SortableItem key={id} id={id} imgSrc={icon.imgSrc} name={icon.name} />;
              })}
            </div>
          </SortableContext>
        </DndContext>
      );
    };

export default MainDesktopBody;
