import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { FaFile } from 'react-icons/fa';
import { IoMdArrowBack, IoMdArrowForward, IoMdSearch } from 'react-icons/io';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import {FoldersIcons} from '@/lib/constants' 
import useAppStore from '@/lib/Store/useAppStore';
import Image from 'next/image';

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
} 

const FinderApp: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [iconSize, setIconSize] = useState(3);
    const {iconsType, setIconsType} = useAppStore();
    const [files] = useState<FileItem[]>([
    { id: 'documents', name: 'Documents', type: 'folder' },
    { id: 'pictures', name: 'Pictures', type: 'folder' },
    { id: 'music', name: 'Music', type: 'folder' },
    { id: 'report', name: 'report.pdf', type: 'file' },
    { id: 'presentation', name: 'presentation.pptx', type: 'file' },
    ]);

    const sidebarItems = ['Favorites', 'iCloud', 'Locations', 'Tags'];

    const getImgSrc = (): string => {
        return FoldersIcons[0].files[iconsType];
    };

    return (
    <div className=" w-full h-full flex flex-col">
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
            <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}`}>
            {files.map((item) => (
                <div
                key={item.id}
                className={`flex items-center ${viewMode === 'grid' ? 'flex-col' : 'space-x-2'} p-2 rounded-lg hover:bg-accent cursor-pointer`}
                >
                {item.type === 'folder' ? (
                    <Image
                    src={getImgSrc()}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                    width={500}
                    height={500}
                    style={{ width: `${iconSize * 0.5}rem`, height: `${iconSize * 0.5}rem` }}
                    />
                ) : (
                    <FaFile className={`text-gray-500`} style={{ fontSize: `${iconSize * 0.5}rem` }} />
                )}
                <span className={`${viewMode === 'grid' ? 'mt-2 text-center' : ''} truncate`}>
                    {item.name}
                </span>
                </div>
            ))}
            </div>
        </ScrollArea>
        </div>

        {/* Status Bar */}
        <Separator className="my-2" />
        <div className="p-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>5 items, 3 folders, 2 files</span>
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