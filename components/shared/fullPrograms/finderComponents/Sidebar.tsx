import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { FaHdd } from 'react-icons/fa';
import { SidebarSection } from './helperComponents';
import { SidebarItem } from './types';

interface SidebarProps {
    sidebarItems: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ sidebarItems }) => (
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
));

export default Sidebar;