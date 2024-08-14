import React from 'react';
import { Slider } from "@/components/ui/slider";

interface StatusBarProps {
    fileCount: number;
    folderCount: number;
    iconSize: number;
    setIconSize: (size: number) => void;
}

const StatusBar: React.FC<StatusBarProps> = React.memo(({ 
    fileCount, 
    folderCount, 
    iconSize, 
    setIconSize 
}) => (
    <div className="bgOpacity !rounded-b-none !p-4 flex items-center justify-between !text-muted-foreground card">
        <span>{fileCount + folderCount} items, {folderCount} folders, {fileCount} files</span>
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
));

export default StatusBar;