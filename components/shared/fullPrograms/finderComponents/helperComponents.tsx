import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { SidebarItem, FileItem } from './types';

export const BreadcrumbNav: React.FC<{ path: string[] }> = ({ path }) => (
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

export const FileContextMenu: React.FC<{ 
    children: React.ReactNode; 
    item: FileItem; 
    onDelete: () => void; 
    onRename: () => void 
}> = ({ children, item, onDelete, onRename }) => (
    <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className='card bgOpacity bgblur'>
            <ContextMenuItem className='text-xs' onClick={() => console.log(`Open ${item.name}`)}>Open</ContextMenuItem>
            <ContextMenuItem className='text-xs' onClick={onDelete}>Delete</ContextMenuItem>
            <ContextMenuItem className='text-xs' onClick={onRename}>Rename</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
);

export const SidebarSection: React.FC<{ item: SidebarItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bgOpacity cursor-pointer">
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