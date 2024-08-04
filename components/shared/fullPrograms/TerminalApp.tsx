"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const TerminalApp: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState<string>('$ ');
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, currentLine]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const executeCommand = (command: string): string => {
        const cmd = command.toLowerCase().trim();
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentLine('$ ' + e.target.value);
    };

    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const command = currentLine.slice(2).trim();
        if (command) {
            setHistory(prev => [...prev, currentLine]);
            const output = executeCommand(command);
            if (output) {
                setHistory(prev => [...prev, output]);
            }
            setCurrentLine('$ ');
        }
    };

    const handleClearClick = () => {
        setHistory([]);
    };

    return (
        <div className="w-full h-full flex flex-col-reverse bg-background/70 text-green-500 font-mono text-sm">
            <ScrollArea className="flex-grow p-4" ref={terminalRef}>
                {history.map((line, index) => (
                    <div key={index} className="mb-2 whitespace-pre-wrap">{line}</div>
                ))}
            </ScrollArea>
            <form onSubmit={handleInputSubmit} className="p-4 flex card bgOpacity bgblur m-2">
                <span className='mr-1 text-green-500'>$</span><input
                    ref={inputRef}
                    type="text"
                    value={currentLine.slice(2)}
                    onChange={handleInputChange}
                    className="flex-grow bg-transparent border-none focus:outline-none text-green-500"
                />
                
            </form>
        </div>
    );
};

export default TerminalApp;