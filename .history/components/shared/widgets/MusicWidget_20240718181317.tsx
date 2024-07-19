import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, SkipBack, SkipForward } from "lucide-react";

const MusicWidget = () => {
    return (
        <Card className="col-span-2 row-span-2">
        <CardHeader>
            <CardTitle>Now Playing</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-center">
            <div>Don't Leave Me Alone</div>
            <div className="text-sm text-gray-500">David Guetta ft. Anne-Marie</div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
            <SkipBack size={24} />
            <Play size={24} />
            <SkipForward size={24} />
            </div>
        </CardContent>
        </Card>
    );
};

export default MusicWidget.tsx