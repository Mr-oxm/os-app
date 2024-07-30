import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiFolder, FiImage, FiChevronLeft, FiChevronRight, FiX, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import Image from 'next/image';

interface Photo {
    id: string;
    name: string;
    url: string;
    date: Date;
}

const Gallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
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
                url: URL.createObjectURL(file),
                date: new Date(file.lastModified)
                }));
            
            setPhotos(newPhotos);
        }
    };

    const handleSelectFolderClick = () => {
        fileInputRef.current?.click();
    };

    const openPreview = (photo: Photo) => {
        setPreviewPhoto(photo);
        setZoom(1);
        setRotation(0);
    };

    const closePreview = () => {
        setPreviewPhoto(null);
    };

    const navigatePreview = (direction: 'prev' | 'next') => {
        if (!previewPhoto) return;
        const currentIndex = sortedPhotos.findIndex(photo => photo.id === previewPhoto.id);
        let newIndex;
        if (direction === 'prev') {
            newIndex = (currentIndex - 1 + sortedPhotos.length) % sortedPhotos.length;
        } else {
            newIndex = (currentIndex + 1) % sortedPhotos.length;
        }
        setPreviewPhoto(sortedPhotos[newIndex]);
        setZoom(1);
        setRotation(0);
    };

    const handleZoom = (direction: 'in' | 'out') => {
        setZoom(prevZoom => {
        if (direction === 'in' && prevZoom < 3) return prevZoom + 0.1;
        if (direction === 'out' && prevZoom > 0.5) return prevZoom - 0.1;
        return prevZoom;
        });
    };

    const handleRotate = () => {
        setRotation(prevRotation => (prevRotation + 90) % 360);
    };

    const handleDownload = () => {
        if (previewPhoto) {
        const link = document.createElement('a');
        link.href = previewPhoto.url;
        link.download = previewPhoto.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    };

    const handleDelete = () => {
        if (previewPhoto) {
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== previewPhoto.id));
        URL.revokeObjectURL(previewPhoto.url);
        closePreview();
        }
    };

    const filteredPhotos = photos.filter(photo => 
        photo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedPhotos = [...filteredPhotos].sort((a, b) => {
        if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
        } else {
        return b.date.getTime() - a.date.getTime();
        }
    });

    useEffect(() => {
        return () => {
        photos.forEach(photo => URL.revokeObjectURL(photo.url));
        };
    }, [photos]);

    return (
        <div className="h-full card relative">
                <div className="flex flex-col h-full gap-4">
                    <div className="flex items-center justify-between card bgOpacity p-4">
                        <h2 className="text-2xl font-bold">Gallery</h2>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search photos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-48"
                            />
                            </div>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center">
                                <FiFilter className="mr-2" />
                                Sort: {sortBy === 'date' ? 'Date' : 'Name'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSortBy('date')}>
                                Sort by Date
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('name')}>
                                Sort by Name
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={handleSelectFolderClick} className="flex items-center">
                            <FiFolder className="mr-2 lucidBarIcon" />
                            Select Folder
                            </Button>
                        </div>
                    </div>

                    {selectedFolder ? (
                        <ScrollArea className="flex-grow !h-[90%]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
                                {sortedPhotos.map((photo) => (
                                    <Card key={photo.id} className="card bgblur bgOpacity cursor-pointer hover:ring-2 ring-primary" onClick={() => openPreview(photo)}>
                                        <div className="aspect-square relative overflow-hidden rounded-lg mb-2 ">
                                        <Image
                                            src={photo.url}
                                            alt={photo.name}
                                            width={100}
                                            height={100}
                                            className="object-cover w-full h-full"
                                        />
                                        </div>
                                        <p className="text-sm truncate">{photo.name}</p>
                                        <p className="text-xs text-gray-500">{photo.date.toLocaleDateString()}</p>
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

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFolderSelect}
                webkitdirectory=""
                directory=""
                style={{ display: 'none' }}
            />

            {previewPhoto && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                        <img
                        src={previewPhoto.url}
                        alt={previewPhoto.name}
                        className="max-w-full max-h-full object-contain transition-all duration-200 ease-in-out"
                        style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                        />

                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Button className="rounded-full bgOpacity" onClick={() => handleZoom('in')}>
                                <FiZoomIn className="lucidBarIcon" />
                            </Button>
                            <Button className="rounded-full bgOpacity" onClick={() => handleZoom('out')}>
                                <FiZoomOut className="lucidBarIcon" />
                            </Button>
                            <Button className="rounded-full bgOpacity" onClick={handleRotate}>
                                <FiRotateCw className="lucidBarIcon" />
                            </Button>
                            <Button className="rounded-full bgOpacity" onClick={handleDownload}>
                                <FiDownload className="lucidBarIcon" />
                            </Button>
                            <Button className="rounded-full bgOpacity" onClick={handleDelete}>
                                <FiTrash2 className="lucidBarIcon" />
                            </Button>
                            <Button className="rounded-full bgOpacity" onClick={closePreview}>
                                <FiX className="lucidBarIcon" />
                            </Button>
                        </div>

                        <Button
                        className="absolute top-1/2 left-4 rounded-full bgOpacity"
                        onClick={() => navigatePreview('prev')}
                        >
                            <FiChevronLeft className="lucidBarIcon" />
                        </Button>

                        <Button
                        className="absolute top-1/2 right-4 rounded-full bgOpacity"
                        onClick={() => navigatePreview('next')}
                        >
                            <FiChevronRight className="lucidBarIcon" />
                        </Button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                            {previewPhoto.name}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;