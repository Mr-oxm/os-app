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
    });
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
    <Card className="col-span-2 row-span-1 bg-sky-500 text-white overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center h-full p-6 relative">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 text-center">
          <div className="text-8xl font-extralight tracking-wider mb-2">
            {formatTime(time)}
          </div>
          <div className="text-2xl font-light tracking-widest">
            {formatDate(time)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClockWidget;