import React, { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export default function Carousel({
  children,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  const slidesToShow = isDesktop ? 3 : isTablet ? 2 : 1;
  const slideWidth = 100 / slidesToShow;

  const clonedChildren = [
    ...children.slice(-slidesToShow),
    ...children,
    ...children.slice(0, slidesToShow),
  ];

  const totalSlides = clonedChildren.length;

  const getTranslateX = (index: number) => {
    return -(((index + slidesToShow) * 100) / totalSlides);
  };

  const moveToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= children.length) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(0);
        }, 0);
        return children.length;
      }
      return nextIndex;
    });
  }, [children.length]);

  const moveToPrevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < -1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(children.length - 1);
        }, 0);
        return -1;
      }
      return nextIndex;
    });
  }, [children.length]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      moveToNextSlide();
      startAutoPlay();
    }, autoPlayInterval);
  }, [moveToNextSlide, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveToPrevSlide();
      if (e.key === "ArrowRight") moveToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveToNextSlide, moveToPrevSlide]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [slidesToShow]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(
      e.type === "mousedown"
        ? (e as React.MouseEvent).pageX
        : (e as React.TouchEvent).touches[0].pageX
    );
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    const currentX =
      e.type === "mousemove"
        ? (e as React.MouseEvent).pageX
        : (e as React.TouchEvent).touches[0].pageX;
    const diff = currentX - startX;
    setTranslate(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsAutoPlaying(autoPlay);
    const threshold = slideWidth / 3;
    if (Math.abs(translate) > threshold) {
      if (translate > 0) {
        moveToPrevSlide();
      } else {
        moveToNextSlide();
      }
    }
    setTranslate(0);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === children.length) {
      setCurrentIndex(0);
    } else if (currentIndex === -1) {
      setCurrentIndex(children.length - 1);
    }
  };

  return (
    <div
      className="relative w-full py-8 my-8 select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(autoPlay)}
      ref={carouselRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Infinite Auto-playing Carousel"
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-500 ease-out",
            isTransitioning && "transition-none"
          )}
          style={{
            transform: `translateX(calc(${getTranslateX(currentIndex)}% + ${translate}px))`,
            width: `${(totalSlides / slidesToShow) * 100}%`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedChildren.map((child, index) => (
            <div
              key={index}
              className="w-full px-2 sm:px-3 md:px-4"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <Button
            onClick={() => {
              moveToPrevSlide();
              setIsAutoPlaying(false);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(autoPlay)}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 rounded-full"
            size="icon"
            variant="outline"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => {
              moveToNextSlide();
              setIsAutoPlaying(false);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(autoPlay)}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            size="icon"
            variant="outline"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
          {children.map((_, idx) => (
            <Button
              key={idx}
              className={cn(
                "h-1 w-1 sm:h-2 sm:w-2 rounded-full p-0",
                currentIndex === idx ||
                  (currentIndex === children.length && idx === 0) ||
                  (currentIndex === -1 && idx === children.length - 1)
                  ? "bg-primary"
                  : "bg-muted"
              )}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}