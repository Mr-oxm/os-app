import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FiFolder, FiImage, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface Photo {
  id: string;
  name: string;
  url: string;
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);
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

  const openPreview = (photo: Photo) => {
    setPreviewPhoto(photo);
  };

  const closePreview = () => {
    setPreviewPhoto(null);
  };

  const navigatePreview = (direction: 'prev' | 'next') => {
    if (!previewPhoto) return;
    const currentIndex = photos.findIndex(photo => photo.id === previewPhoto.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + photos.length) % photos.length;
    } else {
      newIndex = (currentIndex + 1) % photos.length;
    }
    setPreviewPhoto(photos[newIndex]);
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
                  <Card key={photo.id} className="card cursor-pointer" onClick={() => openPreview(photo)}>
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

      <Dialog open={previewPhoto !== null} onOpenChange={closePreview}>
        <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0 bg-transparent border-none">
          {previewPhoto && (
            <div className="relative w-full h-full">
              <img
                src={previewPhoto.url}
                alt={previewPhoto.name}
                className="w-full h-full object-contain"
              />
              <Button
                className="absolute top-2 right-2 rounded-full p-2"
                onClick={closePreview}
              >
                <FiX className="lucidBarIcon" />
              </Button>
              <Button
                className="absolute top-1/2 left-2 rounded-full p-2"
                onClick={() => navigatePreview('prev')}
              >
                <FiChevronLeft className="lucidBarIcon" />
              </Button>
              <Button
                className="absolute top-1/2 right-2 rounded-full p-2"
                onClick={() => navigatePreview('next')}
              >
                <FiChevronRight className="lucidBarIcon" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;