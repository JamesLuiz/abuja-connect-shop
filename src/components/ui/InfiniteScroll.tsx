import { useEffect, useRef, useState, ReactNode } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

interface InfiniteScrollProps {
  children: ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadingComponent?: ReactNode;
  threshold?: number;
  className?: string;
}

const InfiniteScroll = ({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  loadingComponent,
  threshold = 200,
  className = ''
}: InfiniteScrollProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const currentLoadingRef = loadingRef.current;
    
    if (!currentLoadingRef || !hasMore || isLoading) {
      return;
    }

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    );

    observerRef.current.observe(currentLoadingRef);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore, threshold, isMounted]);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {children}
      
      {hasMore && (
        <div ref={loadingRef} className="py-8">
          {isLoading && (
            loadingComponent || <LoadingSkeleton variant="product" count={3} />
          )}
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You've reached the end of the results</p>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;