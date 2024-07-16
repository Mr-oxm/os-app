"use client"
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const Page: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>('$ ');
    const [cursorPosition, setCursorPosition] = useState<number>(2);
    const terminalRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, currentLine]);

    const executeCommand = (command: string): string => {
        const cmd = command.toLowerCase();
        switch (cmd) {
            case 'help':
                return 'Available commands: help, echo, date, clear, whoami, pwd, ls, cat, neofetch';
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
            case 'neofetch':
                return generateNeofetch();
            default:
                return `Command not recognized: ${command}`;
        }
    };

    const generateNeofetch = (): string => {
        const asciiArt = `
   ____                         ______                           
  / __ \\                       |  ____|                          
 | |  | |_ __ ___   __ _ _ __  | |__   _ __ ___   __ _ _ __ __ _ 
 | |  | | '_ \` _ \\ / _\` | '__| |  __| | '_ \` _ \\ / _\` | '__/ _\` |
 | |__| | | | | | | (_| | |    | |____| | | | | | (_| | | | (_| |
  \\____/|_| |_| |_|\\__,_|_|    |______|_| |_| |_|\\__,_|_|  \\__,_|
                                                                 
        `;

        const info = `
            OS: OXM-OS
            Browser: ${navigator.userAgent.split(') ')[0].split(' (')[1]}
            Language: ${navigator.language}
            Screen Resolution: ${window.screen.width}x${window.screen.height}
            Color Depth: ${window.screen.colorDepth}-bit
            CPU Cores: ${navigator.hardwareConcurrency}
            Memory: JS Heap Limit
            Date: ${new Date().toLocaleString()}
            Uptime: ${Math.floor(performance.now() / 1000)} seconds
        `;

        return asciiArt + info;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
            e.preventDefault();
            switch (e.key) {
                case 'c':
                    setHistory(prev => [...prev, currentLine]);
                    setCurrentLine('$ ');
                    setCursorPosition(2);
                    break;
                case 'l':
                    setHistory([]);
                    break;
                case 'a':
                    setCursorPosition(2);
                    break;
                case 'e':
                    setCursorPosition(currentLine.length);
                    break; 
            }
            return;
        }

        switch (e.key) {
            case 'Enter':
                const command = currentLine.slice(2).trim();
                if (command) {
                    setHistory(prev => [...prev, currentLine]);
                    const output = executeCommand(command);
                    if (output) {
                        setHistory(prev => [...prev, output]);
                    }
                    setCurrentLine('$ ');
                    setCursorPosition(2);
                }
                break;
            case 'Backspace':
                if (cursorPosition > 2) {
                    setCurrentLine(prev => prev.slice(0, cursorPosition - 1) + prev.slice(cursorPosition));
                    setCursorPosition(prev => prev - 1);
                }
                break;
            case 'Delete':
                if (cursorPosition < currentLine.length) {
                    setCurrentLine(prev => prev.slice(0, cursorPosition) + prev.slice(cursorPosition + 1));
                }
                break;
            case 'ArrowLeft':
                if (cursorPosition > 2) {
                    setCursorPosition(prev => prev - 1);
                }
                break;
            case 'ArrowRight':
                if (cursorPosition < currentLine.length) {
                    setCursorPosition(prev => prev + 1);
                }
                break;
            case 'Home':
                setCursorPosition(2);
                break;
            case 'End':
                setCursorPosition(currentLine.length);
                break;
            default:
                if (e.key.length === 1) {
                    setCurrentLine(prev => prev.slice(0, cursorPosition) + e.key + prev.slice(cursorPosition));
                    setCursorPosition(prev => prev + 1);
                }
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-background/50 text-green-500 font-mono text-sm">
            <ScrollArea className="flex-grow p-4" ref={terminalRef}>
                {history.map((line, index) => (
                    <div key={index} className="mb-1 whitespace-pre-wrap">{line}</div>
                ))}
                <div
                    className="focus:outline-none relative"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                >
                    {currentLine.slice(0, cursorPosition)}
                    <span ref={cursorRef} className="absolute inline-block w-2 h-5 bg-green-500 animate-pulse" ></span>
                    {currentLine.slice(cursorPosition)}
                </div>
            </ScrollArea>
        </div>
    );
};

export default Page;