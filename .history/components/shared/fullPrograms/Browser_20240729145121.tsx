import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IoReloadOutline, IoArrowBackOutline, IoArrowForwardOutline, IoStarOutline, IoMenuOutline } from 'react-icons/io5';

const Browser: React.FC = () => {
    const [url, setUrl] = useState<string>('https://www.example.com');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulating loading
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <Card className="w-full h-[600px] flex flex-col overflow-hidden card">
            <div className="flex items-center space-x-2 p-2 bgblur bgOpacity">
                <Button variant="ghost" size="icon" className="lucidBarIcon">
                    <IoArrowBackOutline />
                </Button>
                <Button variant="ghost" size="icon" className="lucidBarIcon">
                    <IoArrowForwardOutline />
                </Button>
                <Button variant="ghost" size="icon" className="lucidBarIcon" onClick={() => setIsLoading(true)}>
                    <IoReloadOutline />
                </Button>
                <form onSubmit={handleSubmit} className="flex-grow">
                    <Input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={handleUrlChange}
                        className="w-full bg-background/50"
                    />
                </form>
                <Button variant="ghost" size="icon" className="lucidBarIcon">
                    <IoStarOutline />
                </Button>
                <Button variant="ghost" size="icon" className="lucidBarIcon">
                    <IoMenuOutline />
                </Button>
            </div>
            <div className="flex-grow">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
                    </div>
                ) : (
                    <iframe src={url} className="w-full h-full border-none" title="Browser Content" />
                )}
            </div>
        </Card>
    );
};

export default Browser;