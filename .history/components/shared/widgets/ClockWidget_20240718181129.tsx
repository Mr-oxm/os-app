import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="col-span-2 row-span-1">
        <CardContent className="flex items-center justify-center h-full">
            <span className="text-3xl font-bold">
            {time.toLocaleTimeString()}
            </span>
        </CardContent>
        </Card>
    );
};