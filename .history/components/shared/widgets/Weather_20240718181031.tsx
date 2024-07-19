import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherWidget = () => {
    return (
        <Card className="col-span-2 row-span-2">
        <CardHeader>
            <CardTitle>Weather</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center">
            <span className="text-4xl">🌤️</span>
            <span className="text-2xl ml-2">23°C</span>
            </div>
            <div className="text-center mt-2">Madrid</div>
        </CardContent>
        </Card>
    );
};

export default 