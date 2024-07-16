"use client"
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const Page: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>('$ ');
    const terminalRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, currentLine]);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        if (e.key === 'Enter') {
            const command = currentLine.slice(2).trim();
            if (command) {
                setHistory([...history, currentLine]);
                setHistory(prev => [...prev, 'Command not recognized']);
                setCurrentLine('$ ');
            }
        } else if (e.key === 'Backspace') {
            if (currentLine.length > 2) {
                setCurrentLine(prev => prev.slice(0, -1));
            }
        } else if (e.key.length === 1) {
            setCurrentLine(prev => prev + e.key);
        }
    };

    return (
        <div className="w-full h-full flex flex-col bgOpacity text-green-500 font-mono text-sm">
            <ScrollArea className="flex-grow p-4" ref={terminalRef}>
                {history.map((line, index) => (
                    <div key={index} className="mb-1">{line}</div>
                ))}
                <div 
                    className="focus:outline-none" 
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    {currentLine}
                    <span ref={cursorRef} className="animate-pulse">█</span>
                </div>
            </ScrollArea>
        </div>
    );
};

export default Page;