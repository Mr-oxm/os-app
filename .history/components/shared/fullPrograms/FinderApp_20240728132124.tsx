import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaFolder, FaFile } from 'react-icons/fa';
import { IoMdArrowBack, IoMdArrowForward, IoMdSearch } from 'react-icons/io';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
}

const FinderApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [files] = useState<FileItem[]>([
    { name: 'Documents', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Music', type: 'folder' },
    { name: 'report.pdf', type: 'file' },
    { name: 'presentation.pptx', type: 'file' },
  ]);

  return (
    <div className="card bgOpacity bgblur w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center p-2 space-x-2">
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

      {/* File/Folder Area */}
      <ScrollArea className="flex-grow">
        <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}`}>
          {files.map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${viewMode === 'grid' ? 'flex-col' : 'space-x-2'} p-2 rounded-lg hover:bg-accent cursor-pointer`}
            >
              {item.type === 'folder' ? (
                <FaFolder className="text-3xl text-blue-500" />
              ) : (
                <FaFile className="text-3xl text-gray-500" />
              )}
              <span className={`${viewMode === 'grid' ? 'mt-2 text-center' : ''} truncate`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <Separator className="my-2" />
      <div className="p-2 text-sm text-muted-foreground">
        5 items, 2 folders, 3 files
      </div>
    </div>
  );
};

export default FinderApp;