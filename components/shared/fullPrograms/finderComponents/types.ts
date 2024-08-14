import { ReactNode } from 'react';

export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    size?: number;
    modifiedDate?: Date;
}

export interface SidebarItem {
    name: string;
    icon: ReactNode;
    children?: SidebarItem[];
}