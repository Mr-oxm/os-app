import { useState, useCallback, useEffect } from 'react';
import useAppStore from '@/lib/Store/useAppStore';
import useOSMemoryStore from '@/lib/Store/useOSMemoryStore';
import { useTaskbarStore } from '@/lib/Store/useTaskbarStore';

const useWindowLogic = (programId: string, minimized: boolean) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(true);
    const [isMinimizing, setIsMinimizing] = useState(false);
    const [isMaximizing, setIsMaximizing] = useState(false);
    const [isMaximized, setIsMaximized] = useState(true);
    const [position, setPosition] = useState<{ top: any, left: any }>({ top: 0, left: 0 });
    const [lastPosition, setLastPosition] = useState<{ top: any, left: any }>({ top: 0, left: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: '100%', height: '100%' });
    const [resizeDirection, setResizeDirection] = useState('');
    const { windowType, windowDir } = useAppStore();
    const { minimizeProgram, active, setActive } = useOSMemoryStore();
    const { closeProgram } = useTaskbarStore();

    const handleExit = useCallback(() => {
        setIsClosing(false);
        closeProgram(programId)
    }, [closeProgram, programId]);

    const handleMinimize = useCallback(() => { 
        minimizeProgram(programId);
        setIsMinimizing(false);
    }, [minimizeProgram, programId]);

    const handleMaximize = useCallback(() => {
        if (isMaximized) {
            setIsMaximized(false);
            setPosition(lastPosition);
            setSize({ width: '50%', height: '50%' });
        } else {
            setIsMaximized(true);
            setLastPosition(position);
            setPosition({ top: 0, left: 0 });
            setSize({ width: '100%', height: '100%' });
            setIsDragging(false);
        }
    }, [isMaximized, lastPosition, position]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging && !isMaximized) {
            const newLeft = e.clientX - offset.x;
            const newTop = e.clientY - offset.y;
    
            const minVisible = 50;
            const maxLeft = window.innerWidth - minVisible;
            const maxTop = window.innerHeight - minVisible;
    
            setPosition({
                top: Math.max(0, Math.min(newTop, maxTop)),
                left: Math.max(0, Math.min(newLeft, maxLeft)),
            });
        } else if (isResizing && !isMaximized) {
            const newSize = { ...size };
            const newPosition = { ...position };
            const rect = document.getElementById(`window-${programId}`)!.getBoundingClientRect();
            const minWidth = 200;
            const minHeight = 100;
    
            switch (resizeDirection) { 
                case 's':
                    newSize.height = Math.max(minHeight, e.clientY - rect.top) + "px";
                    break;
                case 'w':
                    newSize.width = Math.max(minWidth, rect.right - e.clientX) + "px";
                    newPosition.left = Math.min(rect.right - minWidth, e.clientX);
                    break;
                case 'e':
                    newSize.width = Math.max(minWidth, e.clientX - rect.left) + "px";
                    break;
                case 'sw':
                    newSize.width = Math.max(minWidth, rect.right - e.clientX) + "px";
                    newSize.height = Math.max(minHeight, e.clientY - rect.top) + "px";
                    newPosition.left = Math.min(rect.right - minWidth, e.clientX);
                    break;
                case 'se':
                    newSize.width = Math.max(minWidth, e.clientX - rect.left) + "px";
                    newSize.height = Math.max(minHeight, e.clientY - rect.top) + "px";
                    break;
            }
    
            setSize(newSize);
            setPosition(newPosition);
        }
    }, [isDragging, isResizing, offset, isMaximized, position, size, resizeDirection, programId]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
    }, []);

    const handleResizeStart = useCallback((direction: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isMaximized) {
            setIsResizing(true);
            setResizeDirection(direction);
        }
    }, [isMaximized]);
    
    const handleSplit = useCallback((direction: string) => {
        if (!isMaximized) setIsMaximized(true);
        switch (direction) {
            case 'left':
                setSize({ width: '50%', height: '100%' });
                setPosition({ top: 0, left: 0 });
                break;
            case 'right':
                setSize({ width: '50%', height: '100%' });
                setPosition({ top: 0, left: '50%' });
                break;
            case 'NW':
                setSize({ width: '50%', height: '50%' });
                setPosition({ top: 0, left: 0 });
                break;
            case 'NE':
                setSize({ width: '50%', height: '50%' });
                setPosition({ top: 0, left: '50%' });
                break;
            case 'SW':
                setSize({ width: '50%', height: '50%' });
                setPosition({ top: '50%', left: 0 });
                break;
            case 'SE':
                setSize({ width: '50%', height: '50%' });
                setPosition({ top: '50%', left: '50%' });
                break;
        }
    }, [isMaximized]);

    useEffect(() => {
        setIsMaximizing(!minimized);
        setIsMinimizing(minimized);
    }, [minimized]);
    
    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    return {
        isClosing,
        isOpening,
        isMinimizing,
        isMaximizing,
        isMaximized,
        position,
        size,
        isDragging,
        isResizing,
        windowType,
        windowDir,
        active,
        handleExit,
        handleMinimize,
        handleMaximize,
        handleMouseMove,
        handleMouseUp,
        handleResizeStart,
        handleSplit,
        setActive,
        setIsClosing,
        setIsDragging,
        setOffset, 
        setIsMaximizing,
        setIsOpening
    };
};

export default useWindowLogic;