import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WiDaySunny, WiStrongWind, WiHumidity } from "react-icons/wi";
import { useState, useEffect } from "react";

const WeatherWidget = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Card className="col-span-2 row-span-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-8xl mb-4 animate-spin-slow">
            <WiDaySunny />
          </div>
          <span className="text-5xl font-bold transition-all duration-500 ease-in-out transform hover:scale-110">
            23°C
          </span>
          <div className="text-2xl mt-2 font-semibold">
            Madrid
          </div>
          <div className="flex justify-between w-full mt-6">
            <div className="flex items-center transition-all duration-300 ease-in-out transform hover:translate-x-2">
              <WiStrongWind className="text-3xl mr-2" />
              <span>5 km/h</span>
            </div>
            <div className="flex items-center transition-all duration-300 ease-in-out transform hover:translate-x-2">
              <WiHumidity className="text-3xl mr-2" />
              <span>60%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;