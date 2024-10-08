"use client"
import { useState } from 'react';
import { DndContext, useSensor, useSensors, closestCenter, PointerSensor} from '@dnd-kit/core';
import {  arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MainDesktopIcon from "../desktopIcons/mainDesktopIcon"; 
import { Underdog } from 'next/font/google';
import {DesktopIcons, FoldersIcons} from '@/lib/constants' 
import useAppStore from '@/lib/Store/useAppStore';
import { StaticImageData } from 'next/image';

interface IconData {
    id: string; 
    name: string;
};

type FolderIconType = {
    [key: string]: (string | StaticImageData)[];
};

const SortableItem = ({ id, imgSrc, name }:{id:string|number, imgSrc:string|StaticImageData, name:string}) => {
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
    const { iconsType, setIconsType, taskbarDir } = useAppStore();
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

    const getImgSrc = (id: string): string | StaticImageData => {
        const folderKey = Object.keys(FoldersIcons).find(key => key === id);
        if (folderKey) {
            return FoldersIcons[folderKey as keyof typeof FoldersIcons][iconsType] as string | StaticImageData;
        }
        return '';
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className={`w-full ${taskbarDir? "h-full":""} flex-1 grid grid-cols-4 md:grid-cols-12 grid-rows-5 gap-2 relative`}>
                    {children}
                    {items.map((id) => {
                        const icon = DesktopIcons.find(icon => icon.id === id)as IconData
                        return <SortableItem key={id} id={id} imgSrc={getImgSrc(id)} name={icon.name} />;
                    })}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default MainDesktopBody;
