import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger, Button } from "@/components/ui";
import { ChevronUp, ChevronDown, Plus, Minus, Play } from "lucide-react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 7)); // July 7, 2024
  const [focusTime, setFocusTime] = useState(30);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getDaysInMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.getDate();
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(currentDate);
    const calendar = [];

    for (let i = 0; i < 42; i++) {
      if (i < firstDay || i >= firstDay + daysInMonth) {
        calendar.push(null);
      } else {
        calendar.push(i - firstDay + 1);
      }
    }

    return calendar;
  };

  return (
    <PopoverContent className="w-64 p-0">
      <div className="bg-gray-800 text-white p-2">
        <div className="flex justify-between items-center">
          <span>{currentDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <span>{monthYear}</span>
          <div>
            <ChevronUp className="w-4 h-4 inline-block" />
            <ChevronDown className="w-4 h-4 inline-block" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map(day => (
            <div key={day} className="text-xs font-semibold">{day}</div>
          ))}
          {generateCalendar().map((day, index) => (
            <div 
              key={index} 
              className={`text-sm p-1 ${day === 7 ? 'bg-blue-500 rounded-full' : ''} ${day ? '' : 'text-gray-500'}`}
            >
              {day || (index < 7 ? '30' : '1')}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center p-2 border-t">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setFocusTime(prev => prev - 5)}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="mx-2">{focusTime} mins</span>
          <Button variant="ghost" size="icon" onClick={() => setFocusTime(prev => prev + 5)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center">
          <Play className="w-4 h-4 mr-1" />
          Focus
        </Button>
      </div>
    </PopoverContent>
  );
}
const windowsTaskbarCalender = () => {
    return (
        <div>windowsTaskbarCalender</div>
    )
}
export default windowsTaskbarCalender