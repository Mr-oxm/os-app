import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { IoMdArrowBack, IoMdArrowForward, IoMdSearch } from 'react-icons/io';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import { DndContext, useSensor, useSensors, closestCenter, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MainDesktopIcon from "../desktopIcons/mainDesktopIcon";
import { FoldersIcons } from '@/lib/constants';
import useAppStore from '@/lib/Store/useAppStore';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
}

const SortableItem = ({ id, imgSrc, name, iconSize }: { id: string, imgSrc: string, name: string, iconSize: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MainDesktopIcon imgSrc={imgSrc} name={name} customSize={iconSize} />
    </div>
  );
};

const FinderApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [iconSize, setIconSize] = useState(3);
  const [files, setFiles] = useState<FileItem[]>([
    { id: 'documents', name: 'Documents', type: 'folder' },
    { id: 'pictures', name: 'Pictures', type: 'folder' },
    { id: 'music', name: 'Music', type: 'folder' },
    { id: 'report', name: 'report.pdf', type: 'file' },
    { id: 'presentation', name: 'presentation.pptx', type: 'file' },
  ]);

  const { iconsType } = useAppStore();
  const sensors = useSensors(useSensor(PointerSensor));

  const sidebarItems = ['Favorites', 'iCloud', 'Locations', 'Tags'];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getImgSrc = (id: string, type: string): string => {
    if (type === 'folder') {
      const folder = FoldersIcons.find(folder => id in folder);
      if (folder) {
        return folder[id][iconsType];
      }
    }
    // Return a default file icon if it's a file or folder icon not found
    return '/path/to/default/file/icon.png';
  };

  return (
    <div className="card bgOpacity bgblur w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center p-2 space-x-2">
        <Button variant="ghost" size="icon" onClick={() => setSidebarVisible(!sidebarVisible)}>
          <AiOutlineMenu className="lucidBarIcon" />
        </Button>
        <Button variant="ghost" size="icon">
          <IoMdArrowBack className="lucidBarIcon" />
        </Button>
        <Button variant="ghost" size="icon">
          <IoMdArrowForward className="lucidBarIcon" />
        </Button>
        <Input className="flex-grow" placeholder="Search" />
        <Button variant="ghost" size="icon">
          <IoMdSearch className="lucidBarIcon" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode('grid')}
        >
          <BsGrid3X3Gap className={`lucidBarIcon ${viewMode === 'grid' ? 'text-primary' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode('list')}
        >
          <BsListUl className={`lucidBarIcon ${viewMode === 'list' ? 'text-primary' : ''}`} />
        </Button>
      </div>

      <Separator className="my-2" />

      {/* Main content area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        {sidebarVisible && (
          <div className="w-48 border-r border-border/20 p-4">
            <ScrollArea className="h-full">
              {sidebarItems.map((item, index) => (
                <div key={index} className="py-2 px-3 rounded-lg hover:bg-accent cursor-pointer">
                  {item}
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {/* File/Folder Area */}
        <ScrollArea className="flex-grow">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={files.map(file => file.id)} strategy={rectSortingStrategy}>
              <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}`}>
                {files.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    imgSrc={getImgSrc(item.id, item.type)}
                    name={item.name}
                    iconSize={iconSize}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </ScrollArea>
      </div>

      {/* Status Bar */}
      <Separator className="my-2" />
      <div className="p-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>{files.length} items, {files.filter(f => f.type === 'folder').length} folders, {files.filter(f => f.type === 'file').length} files</span>
        <div className="flex items-center space-x-2">
          <span>Icon size:</span>
          <Slider
            value={[iconSize]}
            onValueChange={(value) => setIconSize(value[0])}
            min={1}
            max={5}
            step={0.5}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default FinderApp;