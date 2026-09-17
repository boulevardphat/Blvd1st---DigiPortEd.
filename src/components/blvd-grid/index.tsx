import React, { useState, useEffect, useRef } from 'react';
import { BlvdLandscapeGrid } from './BlvdLandscapeGrid';
import { BlvdPortraitGrid } from './BlvdPortraitGrid';

/**
 * BlvdSafezoneGrid - Hệ thống Lưới Safezone Mô đun hóa:
 * - Tự động nhận diện hướng màn hình và chuyển đổi mượt mà giữa:
 *   + BlvdLandscapeGrid: Giao diện ngang (Landscape)
 *   + BlvdPortraitGrid: Giao diện dọc (Portrait)
 * - Tách biệt 100% code giao diện ngang & dọc, dễ tinh chỉnh độc lập.
 * - Mô-đun hóa độc lập, cực kỳ dễ tháo bỏ (chỉ cần bật/tắt hoặc xoá component mà không ảnh hưởng code khác).
 */
export const BlvdSafezoneGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || window.innerWidth,
          height: containerRef.current.clientHeight || window.innerHeight,
        });
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(updateDimensions);
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (ro) ro.disconnect();
    };
  }, []);

  const { width: W, height: H } = dimensions;

  if (W === 0 || H === 0) {
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20" />;
  }

  // Tách biệt hoàn toàn: Ngang (W >= H) và Dọc (W < H)
  const isLandscape = W >= H;

  return (
    <div
      ref={containerRef}
      id="blvd-safezone-grid-container"
      className="absolute inset-0 pointer-events-auto z-20 select-none overflow-hidden"
    >
      {isLandscape ? (
        <BlvdLandscapeGrid width={W} height={H} />
      ) : (
        <BlvdPortraitGrid width={W} height={H} />
      )}
    </div>
  );
};

export { BlvdLandscapeGrid } from './BlvdLandscapeGrid';
export { BlvdPortraitGrid } from './BlvdPortraitGrid';
