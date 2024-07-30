import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaFile, FaFolder, FaHeart, FaTag, FaUpload } from 'react-icons/fa';
import { IoMdArrowBack, IoMdArrowForward, IoMdSearch } from 'react-icons/io';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdLocationOn, MdCreateNewFolder } from 'react-icons/md';
import {FoldersIcons} from '@/lib/constants' 
import useAppStore from '@/lib/Store/useAppStore';
import Image from 'next/image';

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    size?: number;
    modifiedDate?: Date;
}

const FinderApp: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [iconSize, setIconSize] = useState(5);
    const {iconsType, setIconsType} = useAppStore();
    const [files, setFiles] = useState<FileItem[]>([
        { id: 'documents', name: 'Documents', type: 'folder' },
        { id: 'pictures', name: 'Pictures', type: 'folder' },
        { id: 'music', name: 'Music', type: 'folder' },
        { id: 'report', name: 'report.pdf', type: 'file', size: 1024000, modifiedDate: new Date() },
        { id: 'presentation', name: 'presentation.pptx', type: 'file', size: 2048000, modifiedDate: new Date() },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
    const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const sidebarItems = [
        { name: 'Favorites', icon: <FaHeart /> },
        { name: 'iCloud', icon: <FaCloudUploadAlt /> },
        { name: 'Locations', icon: <MdLocationOn /> },
        { name: 'Tags', icon: <FaTag /> },
    ];

    const getImgSrc = (): string => {
        return FoldersIcons[0].files[iconsType];
    };

    const filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFiles = [...filteredFiles].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'date':
                return (b.modifiedDate?.getTime() || 0) - (a.modifiedDate?.getTime() || 0);
            case 'size':
                return (b.size || 0) - (a.size || 0);
            default:
                return 0;
        }
    });

    const handleItemClick = (id: string, event: React.MouseEvent) => {
        if (event.ctrlKey || event.metaKey) {
            setSelectedItems(prev => 
                prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
            );
        } else if (event.shiftKey) {
            const itemIndex = sortedFiles.findIndex(file => file.id === id);
            const lastSelectedIndex = sortedFiles.findIndex(file => file.id === selectedItems[selectedItems.length - 1]);
            const start = Math.min(itemIndex, lastSelectedIndex);
            const end = Math.max(itemIndex, lastSelectedIndex);
            const newSelection = sortedFiles.slice(start, end + 1).map(file => file.id);
            setSelectedItems(newSelection);
        } else {
            setSelectedItems([id]);
        }
    };

    const handleCreateNewFolder = () => {
        const newFolder: FileItem = {
            id: `folder-${Date.now()}`,
            name: 'New Folder',
            type: 'folder',
        };
        setFiles(prev => [...prev, newFolder]);
        setEditingId(newFolder.id);
    };

    const handleRename = (id: string, newName: string) => {
        setFiles(prev => prev.map(file => 
            file.id === id ? { ...file, name: newName } : file
        ));
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        setFiles(prev => prev.filter(file => file.id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newFile: FileItem = {
                id: `file-${Date.now()}`,
                name: file.name,
                type: 'file',
                size: file.size,
                modifiedDate: new Date(),
            };
            setFiles(prev => [...prev, newFile]);
        }
    };

    const BreadcrumbNav = ({ path }: { path: string[] }) => (
        <div className="flex items-center space-x-2 mb-2 w-full">
            {path.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="hover:underline cursor-pointer">{item}</span>
                    {index < path.length - 1 && <span>/</span>}
                </React.Fragment>
            ))}
        </div>
    );

    const FileContextMenu = ({ children, item }: { children: React.ReactNode, item: FileItem }) => (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => console.log(`Open ${item.name}`)}>Open</ContextMenuItem>
                <ContextMenuItem onClick={() => handleDelete(item.id)}>Delete</ContextMenuItem>
                <ContextMenuItem onClick={() => setEditingId(item.id)}>Rename</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );

    return (
    <div className="w-full h-full flex flex-col gap-2 text-xs">
        {/* Toolbar */}
        <div>
            <div className="flex items-center card !rounded-t-none bgOpacity">
                <div className='flex flex-row gap-2 w-1/4 justify-start'>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarVisible(!sidebarVisible)}>
                        <AiOutlineMenu className="lucidBarIcon" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <IoMdArrowBack className="lucidBarIcon" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <IoMdArrowForward className="lucidBarIcon" />
                    </Button>
                </div>
    
                <div className='flex flex-row gap-2 flex-grow justify-center items-center !drop-shadow-none !shadow-none'>
                    <Input
                        className="flex-grow card"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="ghost" size="icon">
                        <IoMdSearch className="lucidBarIcon" />
                    </Button> 
                </div>
    
                <div className='flex flex-row gap-2 w-1/4 justify-end'>
                    <Button variant="ghost" size="icon" onClick={handleCreateNewFolder}>
                        <MdCreateNewFolder className="lucidBarIcon" />
                    </Button>
                    <Input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Button variant="ghost" size="icon">
                            <FaUpload className="lucidBarIcon" />
                        </Button>
                    </label>
                    <Select onValueChange={(value) => setSortBy(value as 'name' | 'date' | 'size')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="size">Size</SelectItem>
                        </SelectContent>
                    </Select>
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
    
            </div>
            {/* Breadcrumb navigation */}
            <BreadcrumbNav path={currentPath}/>
        </div>

        {/* Main content area */}
        <div className="flex flex-grow">
            {/* Sidebar */}
            {sidebarVisible && (
                <div className="w-48 card bgOpacity">
                    <ScrollArea className="h-full">
                        {sidebarItems.map((item, index) => (
                            <div key={index} className="py-2 px-3 rounded-lg hover:bg-accent cursor-pointer flex items-center space-x-2">
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            )}

            {/* File/Folder Area */}
            <ScrollArea className="flex-grow">
                <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}`}>
                    {sortedFiles.map((item) => (
                        <FileContextMenu key={item.id} item={item}>
                            <div
                                className={`flex items-center ${viewMode === 'grid' ? 'flex-col' : 'space-x-2'} p-2 rounded-lg hover:bg-accent cursor-pointer ${selectedItems.includes(item.id) ? 'bg-primary/20' : ''}`}
                                onClick={(e) => handleItemClick(item.id, e)}
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
                                {editingId === item.id ? (
                                    <Input
                                        value={item.name}
                                        onChange={(e) => handleRename(item.id, e.target.value)}
                                        onBlur={() => setEditingId(null)}
                                        autoFocus
                                    />
                                ) : (
                                    <span className={`${viewMode === 'grid' ? 'mt-2 text-center' : ''} truncate`}>
                                        {item.name}
                                    </span>
                                )}
                            </div>
                        </FileContextMenu>
                    ))}
                </div>
            </ScrollArea>
        </div>

        {/* Status Bar */}
        <div className="bgOpacity !rounded-b-none !p-4 flex items-center justify-between !text-muted-foreground card">
            <span>{sortedFiles.length} items, {sortedFiles.filter(f => f.type === 'folder').length} folders, {sortedFiles.filter(f => f.type === 'file').length} files</span>
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