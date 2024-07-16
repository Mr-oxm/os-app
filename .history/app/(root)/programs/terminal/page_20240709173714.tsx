"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Terminal: React.FC = () => {
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
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-secondary">
          <div className="flex space-x-2">
            <Button 
              className="w-3 h-3 rounded-full bg-windowExit hover:bg-windowExit/80" 
              variant="ghost" 
              size="icon"
            />
            <Button 
              className="w-3 h-3 rounded-full bg-windowMinimize hover:bg-windowMinimize/80" 
              variant="ghost" 
              size="icon"
            />
            <Button 
              className="w-3 h-3 rounded-full bg-windowMaximize hover:bg-windowMaximize/80" 
              variant="ghost" 
              size="icon"
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Terminal</span>
        </div>
        <ScrollArea className="h-80 p-4 bg-background text-foreground">
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
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Terminal />
    </div>
  );
};

export default Page;