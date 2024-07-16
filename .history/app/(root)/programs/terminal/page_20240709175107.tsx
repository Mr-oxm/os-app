"use client"
import React, { useState, useRef, KeyboardEvent } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const Page: React.FC = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentCommand, setCurrentCommand] = useState<string>('');
    const terminalRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = currentCommand.trim();
            if (command) {
                setHistory([...history, `$ ${command}`, 'Command not recognized']);
                setCurrentCommand('');
                setTimeout(() => {
                    if (terminalRef.current) {
                        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                    }
                }, 0);
            }
        }
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const text = e.currentTarget.textContent || '';
        setCurrentCommand(text);
    };

    return (
        <div className="w-full h-full flex flex-col bg-black text-green-500 font-mono text-sm">
            <ScrollArea className="flex-grow p-4" ref={terminalRef}>
                {history.map((line, index) => (
                    <div key={index} className="mb-1">{line}</div>
                ))}
                <div className="flex">
                    <span className="mr-2">$</span>
                    <div
                        contentEditable
                        onKeyDown={handleKeyDown}
                        onInput={handleInput}
                        className="focus:outline-none flex-grow direction-normal"
                        dangerouslySetInnerHTML={{ __html: currentCommand }}
                    />
                </div>
            </ScrollArea>
        </div>
    );
};

export default Page;