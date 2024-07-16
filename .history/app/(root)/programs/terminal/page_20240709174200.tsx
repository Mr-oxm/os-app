"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOutput([...output, `$ ${input}`, 'Command not recognized']);
        setInput('');
    };

    return (
        <div className="w-full h-full flex flex-col">
            <ScrollArea className=" p-4 bg-background text-foreground flex-grow">
                {output.map((line, index) => (
                    <div key={index} className="mb-1">
                    {line}
                    </div>
                ))}
            </ScrollArea>

            <form onSubmit={handleSubmit} className="flex p-2 bg-muted">
                <span className="flex items-center pr-2 text-muted-foreground">$</span>
                <Input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="flex-grow bg-transparent border-none focus:ring-0"
                    placeholder="Enter command..."
                />
            </form> 
        </div>
    );
}; 

export default Page;