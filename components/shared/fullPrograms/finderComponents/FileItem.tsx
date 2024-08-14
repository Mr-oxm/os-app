import React from 'react';
import Image from 'next/image';
import { FaFile } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { FileContextMenu } from './helperComponents';
import { FileItem as FileItemType } from './types';
import { FoldersIcons } from '@/lib/constants';
import useAppStore from '@/lib/Store/useAppStore';

interface FileItemProps {
    item: FileItemType;
    viewMode: 'grid' | 'list';
    iconSize: number;
    isSelected: boolean;
    onItemClick: (id: string, event: React.MouseEvent) => void;
    onDelete: () => void;
    onRename: () => void;
    isEditing: boolean;
    handleRename: (newName: string) => void;
    handleNameInputBlur: () => void;
    handleNameInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FileItem: React.FC<FileItemProps> = React.memo(({
    item,
    viewMode,
    iconSize,
    isSelected,
    onItemClick,
    onDelete,
    onRename,
    isEditing,
    handleRename,
    handleNameInputBlur,
    handleNameInputKeyDown
}) => {
    const { iconsType } = useAppStore();

    const getImgSrc = () => {
        if(FoldersIcons['files'][iconsType]) return FoldersIcons['files'][iconsType];
        return "";
    }

    return (
        <FileContextMenu 
            item={item}
            onDelete={onDelete}
            onRename={onRename}
        >
            <div
                className={`flex items-center ${viewMode === 'grid' ? 'flex-col' : 'space-x-2'} p-2 rounded-lg hover:bgOpacity cursor-pointer ${isSelected ? 'bg-primary/20' : ''}`}
                onClick={(e) => onItemClick(item.id, e)}
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
                {isEditing ? (
                    <Input
                        value={item.name}
                        onChange={(e) => handleRename(e.target.value)}
                        onBlur={handleNameInputBlur}
                        onKeyDown={handleNameInputKeyDown}
                        autoFocus
                    />
                ) : (
                    <span className={`${viewMode === 'grid' ? 'mt-2 text-center' : ''} !truncate`}>
                        {item.name}
                    </span>
                )}
            </div>
        </FileContextMenu>
    );
});

export default FileItem;