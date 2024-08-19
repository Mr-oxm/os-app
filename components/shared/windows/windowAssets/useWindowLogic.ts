import { useState, useCallback, useEffect, useMemo } from 'react';
import useAppStore from '@/lib/Store/useAppStore';
import useOSMemoryStore from '@/lib/Store/useOSMemoryStore';
import { useTaskbarStore } from '@/lib/Store/useTaskbarStore';
interface WindowState {
    isClosing: boolean;
    isOpening: boolean;
    isMinimizing: boolean;
    isMaximizing: boolean;
    isMaximized: boolean;
    position: { top: any; left: any };
    lastPosition: { top: any; left: any };
    isDragging: boolean;
    isResizing: boolean;
    offset: { x: number; y: number };
    size: { width: string; height: string };
    resizeDirection: string;
  }

const useWindowLogic = (programId: string, minimized: boolean) => {
    const [windowState, setWindowState] = useState<WindowState>({
        isClosing: false,
        isOpening: true,
        isMinimizing: false,
        isMaximizing: false,
        isMaximized: true,
        position: { top: 0, left: 0 },
        lastPosition: { top: 0, left: 0 },
        isDragging: false,
        isResizing: false,
        offset: { x: 0, y: 0 },
        size: { width: '100%', height: '100%' },
        resizeDirection: '',
      });

      const { windowType, windowDir } = useAppStore();
      const { minimizeProgram, active, setActive } = useOSMemoryStore();
      const { closeProgram } = useTaskbarStore();

    const handleExit = useCallback(() => {
        setWindowState(prev => ({ ...prev, isClosing: false }));
        closeProgram(programId)
    }, [closeProgram, programId]);

    const handleMinimize = useCallback(() => { 
        minimizeProgram(programId);
        setWindowState(prev => ({ ...prev, isMinimizing: false }));
    }, [minimizeProgram, programId]);

    const handleMaximize = useCallback(() => {
        setWindowState(prev => {
            if (prev.isMaximized) {
                return {
                    ...prev,
                    isMaximized: false,
                    position: prev.lastPosition,
                    size: { width: '50%', height: '50%' },
                };
            } else {
                return {
                    ...prev,
                    isMaximized: true,
                    lastPosition: prev.position,
                    position: { top: 0, left: 0 },
                    size: { width: '100%', height: '100%' },
                    isDragging: false,
                };
            }
        });
    }, [windowState.isMaximized, windowState.lastPosition, windowState.position]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setWindowState(prev => {
          if (prev.isDragging && !prev.isMaximized) {
            const newLeft = e.clientX - prev.offset.x;
            const newTop = e.clientY - prev.offset.y;
            const minVisible = 50;
            const maxLeft = window.innerWidth - minVisible;
            const maxTop = window.innerHeight - minVisible;
            return {
              ...prev,
              position: {
                top: Math.max(0, Math.min(newTop, maxTop)),
                left: Math.max(0, Math.min(newLeft, maxLeft)),
              },
            };
          } else if (prev.isResizing && !prev.isMaximized) {
            const rect = document.getElementById(`window-${programId}`)?.getBoundingClientRect();
            if (!rect) return prev;
            const minWidth = 200;
            const minHeight = 100;
            const newSize = { ...prev.size };
            const newPosition = { ...prev.position };
    
            switch (prev.resizeDirection) {
              case 's':
                newSize.height = `${Math.max(minHeight, e.clientY - rect.top)}px`;
                break;
              case 'w':
                newSize.width = `${Math.max(minWidth, rect.right - e.clientX)}px`;
                newPosition.left = Math.min(rect.right - minWidth, e.clientX);
                break;
              case 'e':
                newSize.width = `${Math.max(minWidth, e.clientX - rect.left)}px`;
                break;
              case 'sw':
                newSize.width = `${Math.max(minWidth, rect.right - e.clientX)}px`;
                newSize.height = `${Math.max(minHeight, e.clientY - rect.top)}px`;
                newPosition.left = Math.min(rect.right - minWidth, e.clientX);
                break;
              case 'se':
                newSize.width = `${Math.max(minWidth, e.clientX - rect.left)}px`;
                newSize.height = `${Math.max(minHeight, e.clientY - rect.top)}px`;
                break;
            }
    
            return { ...prev, size: newSize, position: newPosition };
          }
          return prev;
        });
    }, [windowState.isDragging, windowState.isResizing, windowState.offset, windowState.isMaximized, windowState.position, windowState.size, windowState.resizeDirection, programId]);

    const handleMouseUp = useCallback(() => {
        setWindowState(prev => ({ ...prev, isDragging: false, isResizing: false }));
    }, []);

    const handleResizeStart = useCallback((direction: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setWindowState(prev => {
            if (!prev.isMaximized) {
                return { ...prev, isResizing: true, resizeDirection: direction };
            }
            return prev;
        });
    }, [windowState.isMaximized]);
    
    const handleSplit = useCallback((direction: string) => {
        setWindowState(prev => {
            const newState = { ...prev, isMaximized: true };
            switch (direction) {
                case 'left':
                    newState.size = { width: '50%', height: '100%' };
                    newState.position = { top: 0, left: 0 };
                    break;
                case 'right':
                    newState.size = { width: '50%', height: '100%' };
                    newState.position = { top: 0, left: '50%' };
                    break;
                case 'NW':
                    newState.size = { width: '50%', height: '50%' };
                    newState.position = { top: 0, left: 0 };
                    break;
                case 'NE':
                    newState.size = { width: '50%', height: '50%' };
                    newState.position = { top: 0, left: '50%' };
                    break;
                case 'SW':
                    newState.size = { width: '50%', height: '50%' };
                    newState.position = { top: '50%', left: 0 };
                    break;
                case 'SE':
                    newState.size = { width: '50%', height: '50%' };
                    newState.position = { top: '50%', left: '50%' };
                    break;
            }
            return newState;
        });
    }, [windowState.isMaximized]);

    useEffect(() => {
        setWindowState(prev => ({
            ...prev,
            isMaximizing: !minimized,
            isMinimizing: minimized,
        }));
    }, [minimized]);
    
    useEffect(() => {
        if (windowState.isDragging || windowState.isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [windowState.isDragging, windowState.isResizing, handleMouseMove, handleMouseUp]);


    return useMemo(() => ({
        ...windowState,
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
        setIsClosing: (isClosing: boolean) => setWindowState(prev => ({ ...prev, isClosing: isClosing })),
        setIsDragging: (isDragging: boolean) => setWindowState(prev => ({ ...prev, isDragging: isDragging })),
        setOffset: (offset: { x: number; y: number }) => setWindowState(prev => ({ ...prev, offset: offset })),
        setIsMaximizing: (isMaximizing: boolean) => setWindowState(prev => ({ ...prev, isMaximizing: isMaximizing })),
        setIsOpening: (isOpening: boolean) => setWindowState(prev => ({ ...prev, isOpening: isOpening })),
      }), [windowState, windowType, windowDir, active, handleExit, handleMinimize, handleMaximize,
        handleMouseMove, handleMouseUp, handleResizeStart, handleSplit, setActive]);
};

export default useWindowLogic;