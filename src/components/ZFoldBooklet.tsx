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
// COMPONENT CAROUSEL CHO ZONE 16 (1:1, ĐỦ 10 TẤM TỪ 1 ĐẾN 10, CUỘN NGANG KHÔNG GAP)
// ============================================================================
interface Zone16CarouselProps {
  id?: string;
}

export const Zone16Carousel: React.FC<Zone16CarouselProps> = ({ id = "blvd16-carousel" }) => {
  const scrollRef = useDragScroll();

  useEffect(() => {
    preloadBookletImages(BLVD16_PAGES);
  }, []);

  return (
    <div
      ref={scrollRef}
      id={id}
      className="w-full flex items-center justify-start gap-0 overflow-x-auto no-scrollbar py-6 px-6 md:px-12 select-none cursor-grab active:cursor-grabbing touch-pan-x"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex items-center gap-0 w-max shrink-0">
        {BLVD16_PAGES.map((url, idx) => (
          <div
            key={idx}
            className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20"
            style={{
              width: 'clamp(140px, 16vw, 220px)',
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
    </div>
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
  // - Khi đóng: 0deg (hướng thẳng ra người xem như cuốn sách gấp gọn)
  // - Khi mở: -openAngle (ví dụ -24deg)
  // Các tờ tiếp theo lồng vào bản lề mép phải:
  // - Khi mở: nếp gấp lẻ xoay +2*openAngle, nếp gấp chẵn xoay -2*openAngle tạo hình z-fold dích dắc hoàn hảo
  // - Khi thu gọn: nếp gấp lẻ gập -178.5deg (áp lưng vào tờ trước), nếp gấp chẵn gập +178.5deg (áp mặt vào tờ trước)
  const relativeAngle = isFirst
    ? (isOpen ? -openAngle : 0)
    : isOpen
      ? (isEven ? -2 * openAngle : 2 * openAngle)
      : (isEven ? 178.5 : -178.5);

  // Bù độ dày giấy khi đóng gọn để loại bỏ hoàn toàn hiện tượng z-fighting (nhấp nháy pixel chiều sâu)
  const zOffset = !isOpen && !isFirst ? -1.2 : 0;

  return (
    <div
      className="absolute top-0 select-none will-change-transform"
      style={{
        width: `${panelWidth + 0.4}px`,
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
              ? 'linear-gradient(to left, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.12) 100%)'
              : 'linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.18) 100%)',
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

interface ZFoldBookletProps {
  id?: string;
  mode?: '3d' | 'carousel';
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

  // Zoom phóng to thu nhỏ
  const [zoom, setZoom] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number>(0);
  const initialPinchZoomRef = useRef<number>(1);
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

  // Độ rộng thực tế của mô hình khi mở ra và khi gập lại để căn giữa hoàn hảo
  const totalOpenWidth = pages.length * panelWidth * Math.cos((openAngle * Math.PI) / 180);
  const offsetX = isOpen ? -totalOpenWidth / 2 : -panelWidth / 2;
  const offsetY = -panelHeight / 2;

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
        // Dùng hệ số hàm mũ liên tục giúp zoom siêu êm, không bao giờ giật/nháy hình
        const factor = Math.exp(-e.deltaY * 0.012);
        setZoom((prev) => Math.min(2.8, Math.max(0.35, prev * factor)));
      } else {
        // Con lăn chuột tiêu chuẩn hoặc cuộn touchpad 2 ngón
        const delta = -e.deltaY * 0.0015;
        setZoom((prev) => Math.min(2.8, Math.max(0.35, prev + delta)));
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimer);
    };
  }, []);

  // Pointer gestures chuẩn hóa đa nền tảng (Chuột, Touchpad, Touchscreen, Bút cảm ứng)
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}

    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setIsInteracting(true);

    if (activePointersRef.current.size === 1) {
      totalDragDistRef.current = 0;
    } else if (activePointersRef.current.size === 2) {
      // Bắt đầu pinch với 2 ngón tay: tính khoảng cách ban đầu và khóa xoay hoàn toàn
      const pts: { x: number; y: number }[] = [];
      activePointersRef.current.forEach((val) => pts.push(val));
      if (pts.length >= 2) {
        initialPinchDistRef.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        initialPinchZoomRef.current = zoom;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activePointersRef.current.has(e.pointerId)) return;
    e.stopPropagation();

    const prev = activePointersRef.current.get(e.pointerId)!;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 1) {
      // 1 con trỏ / 1 ngón tay: CHỈ XOAY 360 ĐỘ, mượt mà và không độ trễ
      totalDragDistRef.current += Math.hypot(dx, dy);
      setRotY((prevY) => (prevY + dx * 0.55) % 360);
      setRotX((prevX) => Math.max(-85, Math.min(85, prevX - dy * 0.55)));
    } else if (activePointersRef.current.size === 2) {
      // 2 ngón tay trên màn hình cảm ứng: CHỈ PINCH ZOOM, TUYỆT ĐỐI KHÔNG XOAY MODEL!
      // Khắc phục 100% hiện tượng giật lắc model khi phóng to thu nhỏ bằng touch
      const pts: { x: number; y: number }[] = [];
      activePointersRef.current.forEach((val) => pts.push(val));
      if (pts.length >= 2) {
        const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (initialPinchDistRef.current > 10) {
          const scale = currentDist / initialPinchDistRef.current;
          setZoom(Math.min(2.8, Math.max(0.35, initialPinchZoomRef.current * scale)));
        }
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const wasActive = activePointersRef.current.has(e.pointerId);
    activePointersRef.current.delete(e.pointerId);

    if (activePointersRef.current.size === 0) {
      setIsInteracting(false);
      // Nếu là cú nhấp/chạm dứt khoát không kéo rê (< 6px), kích hoạt đóng/mở mô hình
      if (wasActive && totalDragDistRef.current < 6) {
        setIsOpen((prev) => !prev);
      }
    } else if (activePointersRef.current.size === 1) {
      // Nhấc 1 ngón sau pinch: tránh kích hoạt nhấp mở gập nhầm
      totalDragDistRef.current = 100;
    }
  };

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
        <div
          ref={carouselRef}
          id={`${id}-carousel`}
          className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-2 overflow-x-auto no-scrollbar py-6 px-4 select-none cursor-grab active:cursor-grabbing touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* HÀNG TRÊN: Mặt trước (2, 4, 6, 8) - gap-0 liền mạch */}
          <div className="flex items-center gap-0 w-max shrink-0">
            {frontPages.map((url, idx) => (
              <div
                key={`front-${idx}`}
                className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20"
                style={{
                  width: 'clamp(110px, 16vw, 170px)',
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
                className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20"
                style={{
                  width: 'clamp(110px, 16vw, 170px)',
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
      );
    }

    // Carousel đơn lẻ (Zone 18): 1 hàng 6 tờ gap-0
    return (
      <div 
        ref={carouselRef}
        id={`${id}-carousel`}
        className="w-full max-w-6xl mx-auto flex items-center justify-center gap-0 overflow-x-auto no-scrollbar py-6 px-4 select-none cursor-grab active:cursor-grabbing touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex items-center gap-0 w-max shrink-0">
          {pages.map((p, idx) => (
            <div
              key={idx}
              className="shrink-0 relative overflow-hidden bg-[#111] border-y border-white/20"
              style={{
                width: isSquare ? 'clamp(140px, 20vw, 220px)' : 'clamp(120px, 16vw, 180px)',
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
      </div>
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
      style={{ perspective: '2200px', touchAction: 'none' }}
    >
      {/* Khối xoay 360 độ và scale zoom */}
      <div
        className={`relative flex items-center justify-center will-change-transform ${
          isInteracting ? 'transition-none' : 'transition-transform duration-250 ease-out'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
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
