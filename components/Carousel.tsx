'use client'
import React, { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  transitionDuration?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showPlayPauseButton?: boolean;
  desktopSlidesToShow?: number;
  tabletSlidesToShow?: number;
  mobileSlidesToShow?: number;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export default function Carousel({
  children,
  autoPlay = true,
  autoPlayInterval = 5000,
  transitionDuration = 500,
  showControls = true,
  showIndicators = true,
  showPlayPauseButton = true,
  desktopSlidesToShow = 3,
  tabletSlidesToShow = 2,
  mobileSlidesToShow = 1,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  const slidesToShow = isDesktop
    ? desktopSlidesToShow
    : isTablet
    ? tabletSlidesToShow
    : mobileSlidesToShow;
  const slideWidth = 100 / slidesToShow;

  const clonedChildren = [
    ...children.slice(-slidesToShow),
    ...children,
    ...children.slice(0, slidesToShow),
  ];

  const totalSlides = clonedChildren.length;

  const getTranslateX = useCallback((index: number) => {
    return -(((index + slidesToShow) * 100) / totalSlides);
  }, [slidesToShow, totalSlides]);

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
    if (isAutoPlaying && !isHovering) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, isHovering, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveToPrevSlide();
      if (e.key === "ArrowRight") moveToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveToNextSlide, moveToPrevSlide]);

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(
      e.type === "mousedown"
        ? (e as React.MouseEvent).pageX
        : (e as React.TouchEvent).touches[0].pageX
    );
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentX =
      e.type === "mousemove"
        ? (e as React.MouseEvent).pageX
        : (e as React.TouchEvent).touches[0].pageX;
    const diff = currentX - startX;
    setTranslate(diff);
  }, [isDragging, startX]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const threshold = slideWidth / 3;
    if (Math.abs(translate) > threshold) {
      if (translate > 0) {
        moveToPrevSlide();
      } else {
        moveToNextSlide();
      }
    }
    setTranslate(0);
  }, [moveToNextSlide, moveToPrevSlide, slideWidth, translate]);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (currentIndex === children.length) {
      setCurrentIndex(0);
    } else if (currentIndex === -1) {
      setCurrentIndex(children.length - 1);
    }
  }, [currentIndex, children.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  return (
    <div
      className="relative w-full select-none"
      ref={carouselRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Infinite Auto-playing Carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-500 ease-out",
            isTransitioning && "transition-none"
          )}
          style={{
            transform: `translateX(calc(${getTranslateX(
              currentIndex
            )}% + ${translate}px))`,
            width: `${(totalSlides / slidesToShow) * 100}%`,
            transitionDuration: `${transitionDuration}ms`,
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
            onClick={moveToPrevSlide}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-primary/90"
            size="icon"
            variant="outline"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={moveToNextSlide}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-primary/90"
            size="icon"
            variant="outline"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {showPlayPauseButton && (
            <Button
              onClick={toggleAutoPlay}
              className="absolute right-1 rounded-full hover:bg-primary/90"
              size="icon"
              variant="outline"
              aria-label={isAutoPlaying ? "Pause Autoplay" : "Start Autoplay"}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          )}
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
          {children.map((_, idx) => (
            <Button
              key={idx}
              className={cn(
                "h-1 w-1 sm:h-2 sm:w-2 rounded-full p-0 hover:bg-primary/90",
                currentIndex === idx ||
                  (currentIndex === children.length && idx === 0) ||
                  (currentIndex === -1 && idx === children.length - 1)
                  ? "bg-primary"
                  : "bg-muted"
              )}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}