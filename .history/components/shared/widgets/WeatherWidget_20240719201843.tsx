import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from 'react-icons/wi';

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
    const url= `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_API_KEY}`;
    useEffect(() => {
        const fetchWeather = async () => {
        try {
            const response = await axios.get(
            
            );
            console.log(response);
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
        case 'Clear': return <WiDaySunny className="text-6xl text-yellow-400" />;
        case 'Rain': return <WiRain className="text-6xl text-blue-400" />;
        case 'Snow': return <WiSnow className="text-6xl text-gray-200" />;
        default: return <WiCloudy className="text-6xl text-gray-400" />;
        }
    };

    if (!weather) return <div>Loading...</div>;

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white max-w-sm mx-auto">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-3xl font-bold">{weather.name}</h2>
            <p className="text-xl">{Math.round(weather.main.temp)}°C</p>
            </div>
            <div className="transition-all duration-300 hover:scale-110">
            {getWeatherIcon(weather.weather[0].main)}
            </div>
        </div>
        <div className="mt-4">
            <p className="text-lg">{weather.weather[0].description}</p>
            <p className="text-sm">Humidity: {weather.main.humidity}%</p>
            <p className="text-sm">Wind: {weather.wind.speed} m/s</p>
        </div>
        </div>
    );
};

export default WeatherWidget;