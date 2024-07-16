"use client"
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const Page: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>('$ ');
    const [isMatrix, setIsMatrix] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, currentLine]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isMatrix) {
            interval = setInterval(() => {
                const matrixChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
                const matrixLine = Array(40).fill(0).map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]).join('');
                setHistory(prev => [...prev, matrixLine]);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isMatrix]);

    const executeCommand = (command: string): string => {
        const cmd = command.toLowerCase();
        switch (cmd) {
            case 'help':
                return 'Available commands: help, echo, date, clear, whoami, pwd, ls, cat, matrix';
            case 'echo':
                return command.slice(5);
            case 'date':
                return new Date().toString();
            case 'clear':
                setHistory([]);
                return '';
            case 'whoami':
                return 'guest-user';
            case 'pwd':
                return '/home/guest-user';
            case 'ls':
                return 'Documents\nDownloads\nPictures\nMusic\nVideos';
            case 'cat':
                return 'Usage: cat <filename>';
            case 'matrix':
                setIsMatrix(true);
                return 'Entering the Matrix... (Press any key to exit)';
            default:
                return `Command not recognized: ${command}`;
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
       
        if (isMatrix) {
            setIsMatrix(false);
            setHistory(prev => [...prev, 'Exiting the Matrix...']);
            return;
        }

        if (e.key === 'Enter') {
            const command = currentLine.slice(2).trim();
            if (command) {
                setHistory(prev => [...prev, currentLine]);
                const output = executeCommand(command);
                if (output) {
                    setHistory(prev => [...prev, output]);
                }
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
        <div className="w-full h-full flex flex-col bg-background/50 text-green-500 font-mono text-sm">
            <ScrollArea className="flex-grow p-4" ref={terminalRef}>
                {history.map((line, index) => (
                    <div key={index} className="mb-1">{line}</div>
                ))}
                {!isMatrix && (
                    <div
                        className="focus:outline-none"
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                    >
                        {currentLine}
                        <span ref={cursorRef} className="animate-pulse">█</span>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default Page;