import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiFolder, FiImage } from 'react-icons/fi';

interface Photo {
  id: string;
  name: string;
  url: string;
}

const Gallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
        const folderName = files[0].webkitRelativePath.split('/')[0];
        setSelectedFolder(folderName);
        
        const newPhotos: Photo[] = Array.from(files)
            .filter(file => file.type.startsWith('image/'))
            .map(file => ({
            id: file.name,
            name: file.name,
            url: URL.createObjectURL(file)
            }));
        
        setPhotos(newPhotos);
        }
    };

    const handleSelectFolderClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        // Cleanup object URLs on component unmount
        return () => {
        photos.forEach(photo => URL.revokeObjectURL(photo.url));
        };
    }, [photos]);

    return (
        <div className="h-screen p-4 bg-background text-foreground">
        <Card className="h-full bgblur bgOpacity">
            <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Gallery</h2>
                <div className="relative">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFolderSelect}
                    webkitdirectory=""
                    directory=""
                    style={{ display: 'none' }}
                />
                <Button onClick={handleSelectFolderClick} className="flex items-center">
                    <FiFolder className="mr-2 lucidBarIcon" />
                    Select Folder
                </Button>
                </div>
            </div>
            {selectedFolder ? (
                <ScrollArea className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                    <Card key={photo.id} className="card">
                        <div className="aspect-square relative overflow-hidden rounded-lg mb-2">
                        <img
                            src={photo.url}
                            alt={photo.name}
                            className="object-cover w-full h-full"
                        />
                        </div>
                        <p className="text-sm truncate">{photo.name}</p>
                    </Card>
                    ))}
                </div>
                </ScrollArea>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <FiImage className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <p>No folder selected. Choose a folder to view photos.</p>
                </div>
                </div>
            )}
            </div>
        </Card>
        </div>
    );
};

export default Gallery;