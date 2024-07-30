import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Sun, CloudRain, Snowflake, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
    }>;
    wind: {
        speed: number;
    };
}

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(url); 
                setWeather(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case 'Clear': return <Sun className="h-10 w-10 text-yellow-500" />;
            case 'Rain': return <CloudRain className="h-10 w-10 text-blue-500" />;
            case 'Snow': return <Snowflake className="h-10 w-10 text-sky-300" />;
            default: return <Cloud className="h-10 w-10 text-gray-400" />;
        }
    };

    if (!weather) return <WeatherSkeleton />;

    return (
        <Card className="col-span-2 row-span-2 border-transparent bg-transparent shadow-none justify-center">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">{weather.name}</CardTitle>
                {getWeatherIcon(weather.weather[0].main)}
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
                        <p className="text-sm text-muted-foreground capitalize">{weather.weather[0].description}</p>
                    </div> 
                </div>
                <div className="flex flex-row flex-wrap justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Cloud className="h-4 w-4 mr-1" />
                        <span>H: {weather.main.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                        <Wind className="h-4 w-4 mr-1" />
                        <span>W: {weather.wind.speed} m/s</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const WeatherSkeleton: React.FC = () => (
    <Card className="col-span-2 row-span-2 border-transparent bgOpacity bgblur">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Loading....
        </CardHeader> 
    </Card>
);

export default WeatherWidget;