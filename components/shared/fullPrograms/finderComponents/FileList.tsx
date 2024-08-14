import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import FileItem from './FileItem';
import { FileItem as FileItemType } from './types';

interface FileListProps {
    files: FileItemType[];
    viewMode: 'grid' | 'list';
    iconSize: number;
    selectedItems: string[];
    handleItemClick: (id: string, event: React.MouseEvent) => void;
    handleDelete: (id: string) => void;
    handleRename: (id: string, newName: string) => void;
    editingId: string | null;
    setEditingId: (id: string | null) => void;
}

const FileList: React.FC<FileListProps> = React.memo(({
    files,
    viewMode,
    iconSize,
    selectedItems,
    handleItemClick,
    handleDelete,
    handleRename,
    editingId,
    setEditingId
}) => {
    return (
        <ScrollArea className="flex-grow">
            <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}`}>
                {files.map(item => (
                    <FileItem 
                        key={item.id}
                        item={item}
                        viewMode={viewMode}
                        iconSize={iconSize}
                        isSelected={selectedItems.includes(item.id)}
                        onItemClick={handleItemClick}
                        onDelete={() => handleDelete(item.id)}
                        onRename={() => setEditingId(item.id)}
                        isEditing={editingId === item.id}
                        handleRename={(newName) => handleRename(item.id, newName)}
                        handleNameInputBlur={() => setEditingId(null)}
                        handleNameInputKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingId(null);
                        }}
                    />
                ))}
            </div>
        </ScrollArea>
    );
});

export default FileList;