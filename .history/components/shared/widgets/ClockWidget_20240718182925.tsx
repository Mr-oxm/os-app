import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
        }).replace(':', '');
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
        }).toUpperCase();
    };

    return (
        <Card className="col-span-2 row-span-1 bg-gradient-to-b from-sky-400 to-sky-600 text-white overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center h-full p-6 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-center">
            <div className="text-8xl font-thin tracking-widest mb-2">
                {formatTime(time).split('').map((digit, index) => (
                <span key={index} className={index === 2 ? 'text-6xl' : ''}>{digit}</span>
                ))}
            </div>
            <div className="text-xl font-light uppercase tracking-wider">
                {formatDate(time)}
            </div>
            </div>
        </CardContent>
        </Card>
    );
};

export default ClockWidget;