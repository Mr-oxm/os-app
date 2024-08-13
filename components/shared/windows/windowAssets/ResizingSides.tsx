import React from 'react';

interface ResizingSidesProps {
    isMaximized: boolean;
    handleResizeStart: (direction: string) => (e: React.MouseEvent) => void;
}

const ResizingSides: React.FC<ResizingSidesProps> = ({ isMaximized, handleResizeStart }) => {
    if (isMaximized) return null;

    return (
        <>
            <div className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize" onMouseDown={handleResizeStart('s')}></div>
            <div className="absolute top-0 left-0 bottom-0 w-1 cursor-w-resize" onMouseDown={handleResizeStart('w')}></div>
            <div className="absolute top-0 right-0 bottom-0 w-1 cursor-e-resize" onMouseDown={handleResizeStart('e')}></div> 
            <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={handleResizeStart('sw')}></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={handleResizeStart('se')}></div>
        </>
    );
}

export default React.memo(ResizingSides);