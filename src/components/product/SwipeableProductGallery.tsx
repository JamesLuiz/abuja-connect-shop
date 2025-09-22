import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProductImage {
  view: string;
  url: string;
}

interface SwipeableProductGalleryProps {
  images: ProductImage[];
  productName: string;
  discount?: number;
  className?: string;
  showExpandButton?: boolean;
}

const SwipeableProductGallery = ({ 
  images, 
  productName, 
  discount,
  className = '',
  showExpandButton = true
}: SwipeableProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  useEffect(() => {
    // Enable swipe on mobile devices
    const checkMobile = () => {
      setIsSwipeEnabled(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Mouse drag for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    if (isSwipeEnabled) return; // Only on desktop
    setDragStartX(e.clientX);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null || isSwipeEnabled) return;
    
    const dragDistance = e.clientX - dragStartX;
    // Add visual feedback for drag
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${dragDistance * 0.1}px)`;
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null || isSwipeEnabled) return;
    
    const dragDistance = e.clientX - dragStartX;
    const isDragLeft = dragDistance < -minSwipeDistance;
    const isDragRight = dragDistance > minSwipeDistance;

    if (isDragLeft && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isDragRight && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }

    // Reset
    setDragStartX(null);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.transform = 'translateX(0)';
    }
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center h-64 ${className}`}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const ImageViewer = ({ inDialog = false }) => (
    <div className={`relative group ${inDialog ? 'max-w-2xl mx-auto' : ''}`}>
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-lg ${
          inDialog ? 'h-96' : 'h-64'
        } bg-muted select-none`}
        style={{ cursor: !isSwipeEnabled ? 'grab' : 'default' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <img
          src={images[currentIndex].url}
          alt={`${productName} - ${images[currentIndex].view} view`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isImageZoomed && inDialog ? 'scale-125' : 'group-hover:scale-105'
          }`}
          draggable={false}
          onClick={() => inDialog && setIsImageZoomed(!isImageZoomed)}
        />

        {/* Discount Badge */}
        {discount && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            -{discount}%
          </Badge>
        )}

        {/* View Badge */}
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm"
        >
          {images[currentIndex].view}
        </Badge>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevImage();
              }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextImage();
              }}
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Expand Button */}
        {showExpandButton && !inDialog && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Expand className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
              <div className="p-6">
                <ImageViewer inDialog={true} />
                {inDialog && (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    {isImageZoomed ? 'Click image to zoom out' : 'Click image to zoom in'}
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Swipe Indicator for Mobile */}
        {isSwipeEnabled && images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs text-muted-foreground">
              Swipe for more
            </span>
          </div>
        )}
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => goToImage(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center mt-2">
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      <ImageViewer />
    </div>
  );
};

export default SwipeableProductGallery;