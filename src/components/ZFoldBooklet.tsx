import React, { useState, useRef, useEffect, useMemo } from 'react';

export interface BookletPage {
  front: string;
  back: string;
}

// ============================================================================
// ASSETS DATA
// ============================================================================

// [#BLVD] #BLVD18: 6 tờ 4:5
// Mặt trước đọc từ trái sang phải: Col 1 -> Col 6
// Mặt sau khi xoay 180 độ đọc từ trái sang phải: Col 1 -> Col 6
// Khi xoay 180 độ, tờ số 5 (phải) thành mép trái người xem, nên mặt sau tờ 5 là Col 1, tờ 4 là Col 2, ..., tờ 0 là Col 6.
export const BLVD18_PAGES: BookletPage[] = [
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-1.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-6.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-2.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-5.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-3.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-4.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-4.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-3.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-5.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-2.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-6.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-1.webp',
  },
];

// [#BLVD] #BLVD17: 4 tờ 1:1
// Mặt trước đọc từ trái sang phải: [2, 4, 6, 8]
// Mặt sau khi xoay 180 độ đọc từ trái sang phải: [1, 3, 5, 7]
// (Tờ 3 khi xoay thành mép trái người xem nên có mặt sau là 1, tờ 2 là 3, tờ 1 là 5, tờ 0 là 7)
export const BLVD17_PAGES: BookletPage[] = [
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/2.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/7.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/4.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/5.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/6.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/3.webp',
  },
  {
    front: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/8.webp',
    back: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/1.webp',
  },
];

// [#BLVD] #BLVD16: 10 tờ tỉ lệ 1:1, chỉ carousel
export const BLVD16_PAGES: string[] = [
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/1.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/2.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/3.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/4.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/5.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/6.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/7.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/8.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/9.webp',
  'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/10.webp',
];

// ============================================================================
// THUẬT TOÁN PRELOAD ẢNH CHỦ ĐỘNG
// ============================================================================
const preloadedUrls = new Set<string>();
export function preloadBookletImages(urls: string[]) {
  urls.forEach((url) => {
    if (!preloadedUrls.has(url)) {
      preloadedUrls.add(url);
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    }
  });
}

// ============================================================================
// HOOK HỖ TRỢ KÉO CUỘN (DRAG-TO-SCROLL) & CON LĂN CHUỘT NGANG TRÊN DESKTOP
// ============================================================================
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      isDown = false;
      el.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      el.style.cursor = 'grab';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    // Cho phép lăn chuột dọc cuộn dải ảnh ngang tự nhiên và mượt mà
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canScrollLeft = el.scrollLeft > 0 && e.deltaY < 0;
        const canScrollRight = el.scrollLeft < (el.scrollWidth - el.clientWidth - 1) && e.deltaY > 0;
        if (canScrollLeft || canScrollRight) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
        }
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return ref;
}

// ============================================================================
// COMPONENT CONTAINER CAROUSEL HỖ TRỢ ZOOM RA/VÔ & TỰ ĐỘNG MỞ RỘNG KHUNG (KHÔNG BỊ VƯỚNG KHUNG CŨ)
// ============================================================================
interface ZoomableCarouselContainerProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  initialZoom?: number;
}

const ZoomableCarouselContainer: React.FC<ZoomableCarouselContainerProps> = ({
  id,
  className = "",
  children,
  initialZoom = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(initialZoom);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number>(0);
  const initialPinchZoomRef = useRef<number>(initialZoom);
  const gestureStartZoomRef = useRef<number>(initialZoom);

  // Kéo chuột trái để cuộn ngang dải ảnh (Drag to scroll), Lăn chuột & Zoom qua Trackpad / Con lăn
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = () => {
      isDown = false;
      if (el) el.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const onWheel = (e: WheelEvent) => {
      // 1. Pinch zoom trên Trackpad (Chromium, Firefox, Safari gửi wheel với ctrlKey hoặc metaKey)
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        const factor = Math.exp(-e.deltaY * 0.008);
        setZoom((prev) => {
          const next = Math.min(3.5, Math.max(0.6, prev * factor));
          return Number(next.toFixed(2));
        });
        return;
      }

      // 2. Lăn chuột thông thường: cuộn ngang dải ảnh tự nhiên
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canScrollLeft = el.scrollLeft > 0 && e.deltaY < 0;
        const canScrollRight = el.scrollLeft < (el.scrollWidth - el.clientWidth - 1) && e.deltaY > 0;
        if (canScrollLeft || canScrollRight) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
        }
      }
    };

    // 3. WebKit native gesture listeners (Safari Trackpad Pinch)
    const onGestureStart = (e: any) => {
      e.preventDefault();
      gestureStartZoomRef.current = zoom;
    };

    const onGestureChange = (e: any) => {
      e.preventDefault();
      const next = Math.min(3.5, Math.max(0.6, gestureStartZoomRef.current * (e.scale || 1)));
      setZoom(Number(next.toFixed(2)));
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('wheel', onWheel, { passive: false });
    // @ts-ignore
    el.addEventListener('gesturestart', onGestureStart, { passive: false });
    // @ts-ignore
    el.addEventListener('gesturechange', onGestureChange, { passive: false });

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('wheel', onWheel);
      // @ts-ignore
      el.removeEventListener('gesturestart', onGestureStart);
      // @ts-ignore
      el.removeEventListener('gesturechange', onGestureChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [zoom]);

  // Lắng nghe sự kiện reset zoom từ desktop control
  useEffect(() => {
    const handleReset = () => {
      setZoom(initialZoom);
      if (containerRef.current) {
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('blvd-reset-zoom', handleReset);
    return () => window.removeEventListener('blvd-reset-zoom', handleReset);
  }, [initialZoom]);

  const handlePointerDown = (e: React.PointerEvent) => {
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values()) as { x: number; y: number }[];
      initialPinchDistRef.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      initialPinchZoomRef.current = zoom;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activePointersRef.current.has(e.pointerId)) return;
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 2) {
      e.preventDefault();
      const pts = Array.from(activePointersRef.current.values()) as { x: number; y: number }[];
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (initialPinchDistRef.current > 0) {
        const factor = currentDist / initialPinchDistRef.current;
        const targetZoom = Math.min(3.5, Math.max(0.6, initialPinchZoomRef.current * factor));
        setZoom(Number(targetZoom.toFixed(2)));
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    activePointersRef.current.delete(e.pointerId);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle giữa initialZoom và phóng to gấp rưỡi
    setZoom((prev) => {
      const next = Math.abs(prev - initialZoom) < 0.1 ? Number((initialZoom * 1.45).toFixed(2)) : initialZoom;
      if (containerRef.current) {
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center select-none"
      style={{ '--carousel-scale': zoom } as React.CSSProperties}
    >
      <div
        ref={containerRef}
        id={id}
        className={`${className} overflow-x-auto no-scrollbar py-8 select-none cursor-grab active:cursor-grabbing touch-pan-x`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={handleDoubleClick}
      >
        {/* Không dùng transform: scale bọc ngoài để DOM layout tự động mở rộng tự nhiên, không bị kẹt hay khuất khung */}
        <div className="w-max shrink-0 flex flex-col items-start justify-center transition-all duration-200 ease-out">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT INSTAGRAM VIEWER (1 KHUNG TỈ LỆ CHUẨN, VUỐT TOUCH / TOUCHPAD HOẶC BẤM 2 NÚT TRÁI PHẢI)
// ============================================================================
export interface InstagramViewerProps {
  id?: string;
  images: string[];
  aspectRatio?: '4/5' | '1/1';
}

export const InstagramViewer: React.FC<InstagramViewerProps> = ({
  id = 'instagram-viewer',
  images,
  aspectRatio = '1/1',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isThrottledRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    preloadBookletImages(images);
  }, [images]);

  // Điều hướng tới slide trước
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Điều hướng tới slide kế tiếp
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  // Thao tác với bàn phím (Mũi tên trái/phải)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  // Thao tác vuốt Touchpad / Trackpad bằng 2 ngón (vuốt ngang deltaX hoặc dọc deltaY)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 18 && !isThrottledRef.current) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        isThrottledRef.current = true;
        setTimeout(() => {
          isThrottledRef.current = false;
        }, 320);
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [images.length]);

  // Thao tác vuốt màn hình cảm ứng (Touch swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartXRef.current - touchEndX;
    const diffY = (touchStartYRef.current || 0) - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const isSquare = aspectRatio === '1/1';

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full flex flex-col items-center justify-center select-none py-4 px-2"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Khung ảnh chính duy nhất chuẩn tỉ lệ, không bo góc (sharp border brutalist) */}
      <div
        className="relative overflow-hidden bg-[#111] border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 rounded-none group"
        style={{
          width: isSquare ? 'min(85vw, 440px)' : 'min(82vw, 380px)',
          aspectRatio: isSquare ? '1 / 1' : '4 / 5',
          maxHeight: 'calc(var(--vh, 1vh) * 66)',
        }}
      >
        {/* Dải ảnh trượt mượt mà theo currentIndex */}
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="w-full h-full shrink-0 relative bg-black flex items-center justify-center overflow-hidden"
            >
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                referrerPolicy="no-referrer"
                loading={Math.abs(idx - currentIndex) <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Nút bấm trái (<) font archivo, bình thường ẩn, hover vào khung ảnh mới hiện */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={currentIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 bg-black/75 border border-white/30 text-white flex items-center justify-center font-archivo text-base md:text-lg transition-all duration-200 rounded-none cursor-pointer opacity-0 group-hover:opacity-80 hover:!opacity-100 ${
            currentIndex === 0
              ? 'pointer-events-none !opacity-0'
              : 'hover:bg-white hover:text-black active:scale-95'
          }`}
          title="Trang trước"
          aria-label="Previous image"
        >
          ‹
        </button>

        {/* Nút bấm phải (>) font archivo, bình thường ẩn, hover vào khung ảnh mới hiện */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={currentIndex === images.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 bg-black/75 border border-white/30 text-white flex items-center justify-center font-archivo text-base md:text-lg transition-all duration-200 rounded-none cursor-pointer opacity-0 group-hover:opacity-80 hover:!opacity-100 ${
            currentIndex === images.length - 1
              ? 'pointer-events-none !opacity-0'
              : 'hover:bg-white hover:text-black active:scale-95'
          }`}
          title="Trang kế"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* Các thanh định vị vị trí ảnh nằm dưới khung ảnh */}
      <div className="mt-4 flex items-center justify-center gap-1.5 pointer-events-none select-none">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-[2px] transition-all duration-200 rounded-none ${
              idx === currentIndex
                ? 'w-6 bg-white'
                : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT CAROUSEL CHO ZONE 16 (1:1, ĐỦ 10 TẤM TỪ 1 ĐẾN 10, CUỘN NGANG KHÔNG GAP)
// ============================================================================
interface Zone16CarouselProps {
  id?: string;
  mode?: 'carousel' | 'instagram';
}

export const Zone16Carousel: React.FC<Zone16CarouselProps> = ({ 
  id = "blvd16-carousel",
  mode = 'carousel' 
}) => {
  useEffect(() => {
    preloadBookletImages(BLVD16_PAGES);
  }, []);

  if (mode === 'instagram') {
    return (
      <InstagramViewer
        id={`${id}-instagram`}
        images={BLVD16_PAGES}
        aspectRatio="1/1"
      />
    );
  }

  return (
    <ZoomableCarouselContainer
      id={id}
      className="w-full flex items-center justify-start gap-0 px-6 md:px-12"
      initialZoom={2.3}
    >
      <div 
        className="flex items-center gap-0 w-max shrink-0"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {BLVD16_PAGES.map((url, idx) => (
          <div
            key={idx}
            className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20 transition-all duration-200 ease-out"
            style={{
              width: 'calc(clamp(130px, 16vw, 190px) * var(--carousel-scale, 2.3))',
              aspectRatio: '1 / 1',
            }}
          >
            <img
              src={url}
              alt={`#BLVD16 - ${idx + 1}`}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </ZoomableCarouselContainer>
  );
};

// ============================================================================
// COMPONENT 3D BOOKLET & CAROUSEL CHO ZONE 18 & ZONE 17
// ============================================================================
interface BookletPanelItemProps {
  pages: BookletPage[];
  index: number;
  isOpen: boolean;
  panelWidth: number;
  panelHeight: number;
  openAngle: number;
}

// Cấu trúc mô phỏng vật lý origami chuỗi bản lề (Hinged Chain):
// Mỗi trang sách được lồng trực tiếp vào mép phải (left: 100%) của trang trước.
// Đảm bảo các trang 100% nối liền mạch ở nếp gấp, không bao giờ tách rời hay đè xuyên qua nhau!
const ZFoldPanel: React.FC<BookletPanelItemProps> = ({
  pages,
  index,
  isOpen,
  panelWidth,
  panelHeight,
  openAngle,
}) => {
  const isFirst = index === 0;
  const isEven = index % 2 === 0;
  const hasNext = index < pages.length - 1;
  const page = pages[index];

  // Tờ bìa đầu tiên (index 0):
  // - Khi đóng: 0deg (hướng thẳng ra người xem như bìa trước)
  // - Khi mở: -openAngle (nghiêng nhẹ -24deg)
  // Các tờ tiếp theo lồng vào bản lề mép phải (nếp gấp):
  // - Khi mở: nếp lẻ xoay +2*openAngle, nếp chẵn xoay -2*openAngle tạo hình dích dắc z-fold đối xứng
  // - Khi đóng: gập phẳng chính xác 180 độ (-180deg cho nếp lẻ, +180deg cho nếp chẵn)
  const relativeAngle = isFirst
    ? (isOpen ? -openAngle : 0)
    : (isOpen ? (isEven ? -2 * openAngle : 2 * openAngle) : (isEven ? 180 : -180));

  // Khi đóng phẳng: mỗi lớp xếp tuần tự lùi ra sau (theo trục Z thế giới) một khoảng dày 1.5px.
  // Vì các trang lẻ (1, 3, 5) có hệ toạ độ bị lật 180 độ quanh Y nên local translateZ đổi dấu
  // để đảm bảo mọi trang từ 1 đến 5 luôn nằm ở phía sau trang 0, triệt tiêu 100% z-fighting và lỗi đè bìa!
  const zOffset = !isOpen && !isFirst ? (isEven ? index * 1.5 : -index * 1.5) : 0;

  return (
    <div
      className="absolute top-0 select-none will-change-transform"
      style={{
        width: `${panelWidth}px`,
        height: `${panelHeight}px`,
        left: isFirst ? 0 : `${panelWidth}px`,
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        transform: `translateZ(${zOffset}px) rotateY(${relativeAngle}deg)`,
        transition: 'transform 0.85s cubic-bezier(0.2, 0.9, 0.3, 1)',
      }}
    >
      {/* Mặt trước của trang sách (chỉ border-y, không border cạnh để fold liền mạch) */}
      <div
        className="absolute inset-0 w-full h-full bg-[#111] overflow-hidden border-y border-white/20 select-none"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <img
          src={page.front}
          alt={`Booklet page ${index + 1}`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Bóng nếp gập z-fold giả lập chiều sâu ánh sáng tự nhiên */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: isEven
              ? 'linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.12) 100%)'
              : 'linear-gradient(to left, rgba(0,0,0,0.42) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.18) 100%)',
            opacity: isOpen ? 0.6 : 0.05,
          }}
        />
      </div>

      {/* Mặt sau của trang sách (quay 180 độ) */}
      <div
        className="absolute inset-0 w-full h-full bg-[#111] overflow-hidden border-y border-white/20 select-none"
        style={{
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <img
          src={page.back}
          alt={`Booklet page ${index + 1} back`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: isEven
              ? 'linear-gradient(to left, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.18) 100%)'
              : 'linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.12) 100%)',
            opacity: isOpen ? 0.6 : 0.05,
          }}
        />
      </div>

      {/* Tờ tiếp theo được gắn vào bản lề mép phải */}
      {hasNext && (
        <ZFoldPanel
          pages={pages}
          index={index + 1}
          isOpen={isOpen}
          panelWidth={panelWidth}
          panelHeight={panelHeight}
          openAngle={openAngle}
        />
      )}
    </div>
  );
};

export interface ZFoldBookletProps {
  id?: string;
  mode?: '3d' | 'carousel' | 'instagram';
  pages?: BookletPage[];
  aspectRatio?: '4/5' | '1/1';
  showDualCarousel?: boolean; // Cho Zone 17: hiện cả 2 mặt (mặt trên và mặt dưới)
}

export const ZFoldBooklet: React.FC<ZFoldBookletProps> = ({ 
  id = "zfold-booklet", 
  mode = '3d',
  pages = BLVD18_PAGES,
  aspectRatio = '4/5',
  showDualCarousel = false,
}) => {
  // Trạng thái thu hoàn toàn / mở ra hoàn toàn
  const [isOpen, setIsOpen] = useState(true);

  // Xoay 360 độ tự do
  const [rotX, setRotX] = useState(10);
  const [rotY, setRotY] = useState(-15);

  // Di chuyển tự do (Pan X, Y) khi di 2 ngón tay hoặc kéo chuột phải
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Zoom phóng to thu nhỏ
  const [zoom, setZoom] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number>(0);
  const initialPinchZoomRef = useRef<number>(1);
  const lastTwoFingerCenterRef = useRef<{ x: number; y: number } | null>(null);
  const isPanningMouseRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const totalDragDistRef = useRef<number>(0);

  const carouselRef = useDragScroll();

  // Kích thước chuẩn tỉ lệ
  const isSquare = aspectRatio === '1/1';
  const panelWidth = isSquare ? 160 : 140; // px
  const panelHeight = isSquare ? 160 : 175; // px (140 * 1.25 = 175px cho 4:5)

  // Góc mở Z-fold: 24 độ (thanh thoát, rõ nét câu chuyện từng mặt)
  const openAngle = 24;

  // Preload toàn bộ ảnh của booklet này ngay khi mount
  useEffect(() => {
    const urls = pages.flatMap((p) => [p.front, p.back]);
    preloadBookletImages(urls);
  }, [pages]);

  // Căn giữa trọng tâm hình học chuẩn xác:
  // Khối con có kích thước panelWidth x panelHeight và đã được flexbox căn giữa ở (0, 0).
  // - Khi đóng: toàn bộ các trang gập phẳng xếp lớp khít từ x = 0 đến x = panelWidth,
  //   trọng tâm của khối nằm đúng ở tâm container -> offsetX = 0, offsetY = 0.
  // - Khi mở: dải z-fold mở rộng từ x = 0 đến totalOpenWidth,
  //   trọng tâm X nằm ở totalOpenWidth / 2 -> dịch sang trái -(totalOpenWidth - panelWidth) / 2
  //   để toàn bộ dải trang mở rộng tỏa đều cân xứng 2 bên từ đúng tâm màn hình.
  const totalOpenWidth = pages.length * panelWidth * Math.cos((openAngle * Math.PI) / 180);
  const offsetX = isOpen ? -(totalOpenWidth - panelWidth) / 2 : 0;
  const offsetY = 0;

  // Touchpad & Mouse wheel zoom mượt mà, loại bỏ triệt để xung đột lag 300ms
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimer: NodeJS.Timeout;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsInteracting(true);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        setIsInteracting(false);
      }, 150);

      if (e.ctrlKey) {
        // Cử chỉ pinch-zoom trên touchpad (Trackpad macOS / Precision Windows)
        const factor = Math.exp(-e.deltaY * 0.012);
        setZoom((prev) => Math.min(3.5, Math.max(0.35, prev * factor)));
      } else {
        // Con lăn chuột tiêu chuẩn hoặc cuộn touchpad
        const delta = -e.deltaY * 0.0015;
        setZoom((prev) => Math.min(3.5, Math.max(0.35, prev + delta)));
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimer);
    };
  }, []);

  // Lắng nghe sự kiện reset zoom từ control bar cho 3D model
  useEffect(() => {
    const handleReset = () => {
      setZoom(1);
      setRotX(10);
      setRotY(-15);
      setPan({ x: 0, y: 0 });
    };
    window.addEventListener('blvd-reset-zoom', handleReset);
    return () => window.removeEventListener('blvd-reset-zoom', handleReset);
  }, []);

  // Pointer gestures chuẩn hóa đa nền tảng (Chuột, Touchpad, Touchscreen, Bút cảm ứng)
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}

    // Chuột phải (button 2), chuột giữa (button 1) hoặc giữ phím Shift: kích hoạt chế độ Pan di chuyển
    if (e.button === 2 || e.button === 1 || e.shiftKey) {
      isPanningMouseRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }

    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setIsInteracting(true);

    if (activePointersRef.current.size === 1) {
      totalDragDistRef.current = 0;
    } else if (activePointersRef.current.size === 2) {
      // 2 ngón tay: ghi nhận khoảng cách ban đầu (để zoom) và trọng tâm 2 ngón (để pan di chuyển)
      const pts = Array.from(activePointersRef.current.values()) as { x: number; y: number }[];
      if (pts.length >= 2) {
        initialPinchDistRef.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        initialPinchZoomRef.current = zoom;
        lastTwoFingerCenterRef.current = {
          x: (pts[0].x + pts[1].x) / 2,
          y: (pts[0].y + pts[1].y) / 2,
        };
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activePointersRef.current.has(e.pointerId)) return;
    e.stopPropagation();

    // Kéo chuột phải / chuột giữa để di chuyển (Pan) trên desktop
    if (isPanningMouseRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      return;
    }

    const prev = activePointersRef.current.get(e.pointerId)!;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 1) {
      // 1 ngón tay / 1 con trỏ: XOAY 360 ĐỘ tự do, mượt mà
      totalDragDistRef.current += Math.hypot(dx, dy);
      setRotY((prevY) => (prevY + dx * 0.55) % 360);
      setRotX((prevX) => Math.max(-85, Math.min(85, prevX - dy * 0.55)));
    } else if (activePointersRef.current.size === 2) {
      // 2 ngón tay trên màn hình cảm ứng:
      // 1) DI 2 NGÓN TAY ĐỂ DI CHUYỂN (TWO-FINGER PAN)
      // 2) KẸP / MỞ 2 NGÓN TAY ĐỂ ZOOM (PINCH ZOOM)
      // KHÔNG XOAY MODEL để không làm mất góc nhìn khi xem chi tiết!
      const pts = Array.from(activePointersRef.current.values()) as { x: number; y: number }[];
      if (pts.length >= 2) {
        const currentCenter = {
          x: (pts[0].x + pts[1].x) / 2,
          y: (pts[0].y + pts[1].y) / 2,
        };

        if (lastTwoFingerCenterRef.current) {
          const dCenterX = currentCenter.x - lastTwoFingerCenterRef.current.x;
          const dCenterY = currentCenter.y - lastTwoFingerCenterRef.current.y;
          setPan((prev) => ({ x: prev.x + dCenterX, y: prev.y + dCenterY }));
        }
        lastTwoFingerCenterRef.current = currentCenter;

        const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (initialPinchDistRef.current > 10) {
          const scale = currentDist / initialPinchDistRef.current;
          setZoom(Math.min(3.5, Math.max(0.35, initialPinchZoomRef.current * scale)));
        }
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    isPanningMouseRef.current = false;
    const wasActive = activePointersRef.current.has(e.pointerId);
    activePointersRef.current.delete(e.pointerId);

    if (activePointersRef.current.size < 2) {
      lastTwoFingerCenterRef.current = null;
    }

    if (activePointersRef.current.size === 0) {
      setIsInteracting(false);
      // Nếu là cú chạm dứt khoát không rê kéo (< 6px), kích hoạt đóng/mở mô hình
      if (wasActive && totalDragDistRef.current < 6) {
        setIsOpen((prev) => !prev);
      }
    } else if (activePointersRef.current.size === 1) {
      // Sau khi nhấc 1 ngón: tránh kích hoạt đóng/mở nhầm
      totalDragDistRef.current = 100;
    }
  };

  // Nhấp đúp (Double click / Double tap) để reset vị trí và góc nhìn về ban đầu
  const handleDoubleClick = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setRotX(10);
    setRotY(-15);
  };

  // ==========================================================================
  // RENDER INSTAGRAM MODE (1 KHUNG TỈ LỆ CHUẨN, VUỐT TOUCH / TOUCHPAD HOẶC BẤM NÚT TRÁI PHẢI)
  // ==========================================================================
  if (mode === 'instagram') {
    if (showDualCarousel) {
      // Zone 17: gồm 4 ảnh mặt trước [2, 4, 6, 8] và 4 ảnh mặt sau [1, 3, 5, 7]
      const frontPages = pages.map((p) => p.front);
      const backStoryPages = [
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/1.webp',
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/3.webp',
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/5.webp',
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/7.webp',
      ];
      return (
        <InstagramViewer
          id={`${id}-instagram`}
          images={[...frontPages, ...backStoryPages]}
          aspectRatio={aspectRatio}
        />
      );
    }

    // Zone 18 (hoặc booklet chuẩn): 6 trang mặt trước
    return (
      <InstagramViewer
        id={`${id}-instagram`}
        images={pages.map((p) => p.front)}
        aspectRatio={aspectRatio}
      />
    );
  }

  // ==========================================================================
  // RENDER CAROUSEL MODE
  // ==========================================================================
  if (mode === 'carousel') {
    // Nếu là Zone 17 (showDualCarousel = true): hiện cả 2 mặt thành 2 hàng trên/dưới
    // Hàng trên: mặt trước [2, 4, 6, 8]
    // Hàng dưới: mặt sau [7, 5, 3, 1]
    if (showDualCarousel) {
      const frontPages = pages.map((p) => p.front);
      // Mặt dưới lấy theo thứ tự câu chuyện của mặt sau [1, 3, 5, 7] (đảo phải sang trái ngược lại)
      const backStoryPages = [
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/1.webp',
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/3.webp',
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/5.webp',
        'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/7.webp',
      ];

      return (
        <ZoomableCarouselContainer
          id={`${id}-carousel`}
          className="w-full max-w-6xl mx-auto flex items-center justify-center px-4"
        >
          <div
            className="flex flex-col items-center justify-center gap-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* HÀNG TRÊN: Mặt trước (2, 4, 6, 8) - gap-0 liền mạch */}
            <div className="flex items-center gap-0 w-max shrink-0">
              {frontPages.map((url, idx) => (
                <div
                  key={`front-${idx}`}
                  className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20 transition-all duration-200 ease-out"
                  style={{
                    width: 'calc(clamp(110px, 16vw, 170px) * var(--carousel-scale, 1))',
                    aspectRatio: '1 / 1',
                  }}
                >
                  <img
                    src={url}
                    alt={`BLVD17 Front ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* HÀNG DƯỚI: Mặt dưới (7, 5, 3, 1) - nằm ngay dưới hàng trên - gap-0 liền mạch */}
            <div className="flex items-center gap-0 w-max shrink-0">
              {backStoryPages.map((url, idx) => (
                <div
                  key={`back-${idx}`}
                  className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20 transition-all duration-200 ease-out"
                  style={{
                    width: 'calc(clamp(110px, 16vw, 170px) * var(--carousel-scale, 1))',
                    aspectRatio: '1 / 1',
                  }}
                >
                  <img
                    src={url}
                    alt={`BLVD17 Back ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </ZoomableCarouselContainer>
      );
    }

    // Carousel đơn lẻ (Zone 18): 1 hàng 6 tờ gap-0
    return (
      <ZoomableCarouselContainer
        id={`${id}-carousel`}
        className="w-full max-w-6xl mx-auto flex items-center justify-center px-4"
      >
        <div 
          className="flex items-center gap-0 w-max shrink-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {pages.map((p, idx) => (
            <div
              key={idx}
              className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20 transition-all duration-200 ease-out"
              style={{
                width: isSquare 
                  ? 'calc(clamp(140px, 20vw, 220px) * var(--carousel-scale, 1))' 
                  : 'calc(clamp(120px, 16vw, 180px) * var(--carousel-scale, 1))',
                aspectRatio: isSquare ? '1 / 1' : '4 / 5',
              }}
            >
              <img
                src={p.front}
                alt={`Page ${idx + 1}`}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </ZoomableCarouselContainer>
    );
  }

  // ==========================================================================
  // RENDER 3D MODEL MODE
  // ==========================================================================
  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full h-[70vh] max-w-5xl mx-auto flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => e.preventDefault()}
      style={{ perspective: '2200px', touchAction: 'none' }}
    >
      {/* Khối di chuyển (Pan), xoay 360 độ và scale zoom */}
      <div
        className={`relative flex items-center justify-center will-change-transform ${
          isInteracting ? 'transition-none' : 'transition-transform duration-250 ease-out'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}
      >
        {/* Khối căn giữa booklet theo chiều rộng thực tế khi mở ra hoặc khi gập lại */}
        <div
          className="relative will-change-transform"
          style={{
            width: `${panelWidth}px`,
            height: `${panelHeight}px`,
            transformStyle: 'preserve-3d',
            transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
            transition: 'transform 0.85s cubic-bezier(0.2, 0.9, 0.3, 1)',
          }}
        >
          <ZFoldPanel
            pages={pages}
            index={0}
            isOpen={isOpen}
            panelWidth={panelWidth}
            panelHeight={panelHeight}
            openAngle={openAngle}
          />
        </div>
      </div>
    </div>
  );
};
