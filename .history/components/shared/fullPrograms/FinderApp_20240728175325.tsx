import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FaFile, FaHeart, FaTag, FaUpload, FaSort, FaCloudUploadAlt, FaTrash, FaClock, FaShareAlt, FaHdd } from 'react-icons/fa';
import { IoMdArrowBack, IoMdArrowForward, IoMdSearch } from 'react-icons/io';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';
import { AiOutlineMenu, AiFillFile, AiFillPicture, AiFillVideoCamera } from 'react-icons/ai';
import { MdLocationOn, MdCreateNewFolder, MdExpandMore, MdExpandLess } from 'react-icons/md';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";

import { FoldersIcons } from '@/lib/constants';
import useAppStore from '@/lib/Store/useAppStore';

// Types
interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    size?: number;
    modifiedDate?: Date;
}

interface SidebarItem {
    name: string;
    icon: React.ReactNode;
    children?: SidebarItem[];
}

// Helper Components
const BreadcrumbNav: React.FC<{ path: string[] }> = ({ path }) => (
    <Breadcrumb>
        {path.map((item, index) => (
            <React.Fragment key={index}>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < path.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
        ))}
    </Breadcrumb>
);

const FileContextMenu: React.FC<{ children: React.ReactNode; item: FileItem; onDelete: () => void; onRename: () => void }> = 
    ({ children, item, onDelete, onRename }) => (
    <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className='card bgOpacity bgblur'>
            <ContextMenuItem className='text-xs' onClick={() => console.log(`Open ${item.name}`)}>Open</ContextMenuItem>
            <ContextMenuItem className='text-xs' onClick={onDelete}>Delete</ContextMenuItem>
            <ContextMenuItem className='text-xs' onClick={onRename}>Rename</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
);

const SidebarSection: React.FC<{ item: SidebarItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-accent cursor-pointer">
                <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.name}</span>
                </div>
                {item.children && (isOpen ? <MdExpandLess /> : <MdExpandMore />)}
            </CollapsibleTrigger>
            {item.children && (
                <CollapsibleContent>
                    {item.children.map((child, index) => (
                        <div key={index} className="pl-6 py-1 hover:bg-accent cursor-pointer flex items-center space-x-2">
                            {child.icon}
                            <span>{child.name}</span>
                        </div>
                    ))}
                </CollapsibleContent>
            )}
        </Collapsible>
    );
};

// Main Component
const FinderApp: React.FC = () => {
    // State
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [iconSize, setIconSize] = useState(5);
    const { iconsType } = useAppStore();
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

    // Constants
    const sidebarItems: SidebarItem[] = [
        { 
            name: 'Favorites', 
            icon: <FaHeart />,
            children: [
                { name: 'Documents', icon: <AiFillFile /> },
                { name: 'Desktop', icon: <AiFillPicture /> },
                { name: 'Downloads', icon: <AiFillFile /> },
            ]
        },
        { name: 'iCloud', icon: <FaCloudUploadAlt /> },
        { 
            name: 'Locations', 
            icon: <MdLocationOn />,
            children: [
                { name: 'Home', icon: <MdLocationOn /> },
                { name: 'Work', icon: <MdLocationOn /> },
            ]
        },
        { name: 'Tags', icon: <FaTag /> },
        { name: 'Recent', icon: <FaClock /> },
        { name: 'Shared', icon: <FaShareAlt /> },
        { name: 'Trash', icon: <FaTrash /> },
    ];

    // Helper functions
    const getImgSrc = (): string|StaticImageData => {if(FoldersIcons[0].files) return FoldersIcons[0].files[iconsType]; return "";}

    const filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFiles = [...filteredFiles].sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.name.localeCompare(b.name);
            case 'date': return (b.modifiedDate?.getTime() || 0) - (a.modifiedDate?.getTime() || 0);
            case 'size': return (b.size || 0) - (a.size || 0);
            default: return 0;
        }
    });

    // Event Handlers
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

    const handleNameInputBlur = () => {
        setEditingId(null);
    };

    const handleNameInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditingId(null);
        }
    };

    // Render functions
    const renderToolbar = () => (
        <div className='flex flex-col items-center card !rounded-t-none bgOpacity gap-1 !p-2'>
            <div className="flex items-center w-full">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <FaSort className="lucidBarIcon" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='card bgOpacity bgblur'>
                            <DropdownMenuItem className='text-xs' onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                            <DropdownMenuItem className='text-xs' onClick={() => setSortBy('date')}>Date</DropdownMenuItem>
                            <DropdownMenuItem className='text-xs' onClick={() => setSortBy('size')}>Size</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
            <BreadcrumbNav path={currentPath}/>
        </div>
    );

    const renderSidebar = () => (
        <div className="w-64 card bgOpacity flex flex-col h-full">
            <ScrollArea className="flex-grow">
                {sidebarItems.map((item, index) => (
                    <SidebarSection key={index} item={item} />
                ))}
            </ScrollArea>
            <div className="p-4 border-t">
                <h4 className="mb-2 font-semibold">Disk Space</h4>
                <Progress value={67} className="mb-2" />
                <p className="text-sm text-muted-foreground">134.5 GB free of 512 GB</p>
            </div>
            <div className="p-4 border-t">
                <h4 className="mb-2 font-semibold">Devices</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FaHdd />
                    <span>External Drive (2 TB)</span>
                </div>
            </div>
        </div>
    );

    const renderFileItem = (item: FileItem) => (
        <FileContextMenu 
            key={item.id} 
            item={item}
            onDelete={() => handleDelete(item.id)}
            onRename={() => setEditingId(item.id)}
        >
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
                        onBlur={handleNameInputBlur}
                        onKeyDown={handleNameInputKeyDown}
                        autoFocus
                    />
                ) : (
                    <span className={`${viewMode === 'grid' ? 'mt-2 text-center' : ''} truncate`}>
                        {item.name}
                    </span>
                )}
            </div>
        </FileContextMenu>
    );

    const renderStatusBar = () => (
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
    );

    // Main render
    return (
        <div className="w-full h-full flex flex-col gap-2 text-xs">
            {renderToolbar()}
            <div className="flex flex-grow">
                {sidebarVisible && renderSidebar()}
                <ScrollArea className="flex-grow">
                    <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}`}>
                        {sortedFiles.map(renderFileItem)}
                    </div>
                </ScrollArea>
            </div>
            {renderStatusBar()}
        </div>
    );
};

export default FinderApp;