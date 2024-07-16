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
        OS: NextJS 14 x64
        Host: Vercel Cloud
        Kernel: 5.10.0-custom
        Uptime: 42 days, 15 hours, 27 mins
        Packages: npm (1500)
        Shell: bash 5.1.4
        Resolution: 1920x1080
        DE: Chrome
        WM: React
        Terminal: web-based
        CPU: Intel i9-9900K (16) @ 3.600GHz
        GPU: NVIDIA RTX 3080
        Memory: 32768MiB
        `;

        return asciiArt + info;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault(); 
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
                    <div key={index} className="mb-1 whitespace-pre-wrap">{line}</div>
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