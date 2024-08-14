import React, { useState, useCallback, useMemo } from 'react';
import Toolbar from './finderComponents/Toolbar';
import Sidebar from './finderComponents/Sidebar';
import FileList from './finderComponents/FileList';
import StatusBar from './finderComponents/StatusBar';
import { FileItem, SidebarItem } from './finderComponents/types';
import { FaHeart, FaCloudUploadAlt, FaTag, FaClock, FaShareAlt, FaTrash } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { AiFillFile, AiFillPicture } from 'react-icons/ai';

const FinderApp: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [iconSize, setIconSize] = useState(5);
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

    const sortedFiles = useMemo(() => {
        return [...files]
            .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                switch (sortBy) {
                    case 'name': return a.name.localeCompare(b.name);
                    case 'date': return ((b.modifiedDate?.getTime() || 0) - (a.modifiedDate?.getTime() || 0));
                    case 'size': return ((b.size || 0) - (a.size || 0));
                    default: return 0;
                }
            });
    }, [files, searchTerm, sortBy]);
    
    const handleItemClick = useCallback((id: string, event: React.MouseEvent) => {
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
    }, [sortedFiles, selectedItems]);

    const handleCreateNewFolder = useCallback(() => {
        const newFolder: FileItem = {
            id: `folder-${Date.now()}`,
            name: 'New Folder',
            type: 'folder',
        };
        setFiles(prev => [...prev, newFolder]);
        setEditingId(newFolder.id);
    }, []);

    const handleRename = useCallback((id: string, newName: string) => {
        setFiles(prev => prev.map(file => 
            file.id === id ? { ...file, name: newName } : file
        ));
    }, []);

    const handleDelete = useCallback((id: string) => {
        setFiles(prev => prev.filter(file => file.id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
    }, []);


    return (
        <div className="w-full h-full flex flex-col gap-2 text-xs bgOpacity">
            <Toolbar 
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleCreateNewFolder={handleCreateNewFolder}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                currentPath={currentPath}
            />
            <div className="flex flex-grow">
                {sidebarVisible && <Sidebar sidebarItems={sidebarItems} />}
                <FileList 
                    files={sortedFiles}
                    viewMode={viewMode}
                    iconSize={iconSize}
                    selectedItems={selectedItems}
                    handleItemClick={handleItemClick}
                    handleDelete={handleDelete}
                    handleRename={handleRename}
                    editingId={editingId}
                    setEditingId={setEditingId}
                />
            </div>
            <StatusBar 
                fileCount={sortedFiles.filter(f => f.type === 'file').length}
                folderCount={sortedFiles.filter(f => f.type === 'folder').length}
                iconSize={iconSize}
                setIconSize={setIconSize}
            />
        </div>
    );
};

export default FinderApp;