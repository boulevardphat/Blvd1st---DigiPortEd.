import React, { useState, useRef, useEffect } from 'react';

interface BlvdGridProps {
  width: number;
  height: number;
}

/**
 * BlvdPortraitGrid: Bố cục lưới Safezone riêng biệt cho GIAO DIỆN DỌC (PORTRAIT)
 * - Safezone: 6% chiều rộng và 5% chiều dọc (đảm bảo né tai thỏ/thanh điều hướng di động).
 * - Logo #BLVD:
 *   + Ban đầu stretch hết toàn bộ Safezone (tính cả phần sọc chéo).
 *   + Khi người dùng vuốt lên: responsive co ngắn lại, vuốt xuống dài ra theo thao tác.
 *   + Kéo hết: cuộn xuống thu gọn hoàn toàn và hiển thị lưới ô vuông bình thường.
 * - Lưới Ô VUÔNG (1:1): Căng tràn 100% chiều ngang Safezone (gridW = sw), không có khoảng dư ở 2 bên trái/phải.
 * - Khoảng dư (Excess space) CHỈ xuất hiện ở CẠNH TRÊN VÀ CẠNH DƯỚI, được phủ sọc chéo 45 độ.
 * - Toàn bộ viền Safezone, đường chia ô vuông và sọc chéo dùng nét liền, đen (#000000) và mỏng (1px).
 * - Không bo góc (chuẩn Boulevard1st).
 */
export const BlvdPortraitGrid: React.FC<BlvdGridProps> = ({ width: W, height: H }) => {
  // 1. Xác định Safezone cho màn hình dọc (6% ngang, 5% dọc)
  const marginX = Math.round(Math.max(20, W * 0.06));
  const marginY = Math.round(Math.max(24, H * 0.05));
  const sx = marginX;
  const sy = marginY;
  const sw = Math.max(10, W - 2 * marginX);
  const sh = Math.max(10, H - 2 * marginY);

  // 2. Chia Safezone theo chiều ngang thành các Ô VUÔNG (1:1)
  // Target cell size khoảng ~36px - 42px cho màn hình dọc
  const targetCellSize = 38;
  const cols = Math.max(1, Math.round(sw / targetCellSize));
  const cellSize = sw / cols; // Mỗi ô vuông có width = height = cellSize

  // Số hàng ô vuông trọn vẹn fit được vào chiều cao Safezone
  const rows = Math.max(1, Math.floor(sh / cellSize));
  const gridW = sw; // 100% chiều rộng Safezone -> TRÁI VÀ PHẢI KHÔNG CÓ KHOẢNG DƯ
  const gridH = rows * cellSize;

  // Căn giữa lưới theo trục dọc trong Safezone -> Khoảng dư chỉ xuất hiện ở CẠNH TRÊN VÀ CẠNH DƯỚI
  const gridX = sx;
  const excessY = Math.max(0, sh - gridH);
  const topH = Math.round(excessY / 2);
  const bottomH = excessY - topH;
  const gridY = sy + topH;

  // Danh sách toạ độ các đường kẻ dọc (bên trong lưới ô vuông)
  const verticalLines: number[] = [];
  for (let c = 1; c < cols; c++) {
    verticalLines.push(gridX + c * cellSize);
  }

  // Danh sách toạ độ các đường kẻ ngang (bên trong lưới ô vuông)
  const horizontalLines: number[] = [];
  for (let r = 1; r < rows; r++) {
    horizontalLines.push(gridY + r * cellSize);
  }

  // 3. Trạng thái vuốt co/dãn logo #BLVD trên mobile:
  // progress: 0 (logo stretch 100% toàn bộ safezone) -> 1 (thu gọn hoàn toàn, hiện grid bình thường)
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  progressRef.current = progress;

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  const hasMovedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const wheelTimeoutRef = useRef<any>(null);

  const stopAnimation = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (wheelTimeoutRef.current !== null) {
      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = null;
    }
  };

  const animateTo = (target: number) => {
    stopAnimation();
    const startVal = progressRef.current;
    const diff = target - startVal;
    if (Math.abs(diff) < 0.001) {
      setProgress(target);
      return;
    }

    const duration = 260; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - t, 3);
      const current = startVal + diff * ease;
      setProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setProgress(target);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => stopAnimation();
  }, []);

  // 1. Xử lý Pointer events (chuột / pen / pointer)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopAnimation();
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startProgressRef.current = progressRef.current;
    hasMovedRef.current = false;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dy = startYRef.current - e.clientY; // Vuốt lên -> dy > 0
    if (Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }

    // Khoảng cách vuốt nhạy bén (~30% chiều cao Safezone)
    const dragRange = Math.max(90, sh * 0.3);
    const delta = dy / dragRange;
    const nextProg = Math.max(0, Math.min(1, startProgressRef.current + delta));
    setProgress(nextProg);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const current = progressRef.current;
    if (startProgressRef.current < 0.5) {
      // Vuốt nhẹ lên (>12%) tự động kích hoạt cuộn hết và mở lưới
      if (current > 0.12) {
        animateTo(1);
      } else {
        animateTo(0);
      }
    } else {
      // Đang ở lưới, vuốt nhẹ xuống (>15%) bung logo trở lại
      if (current < 0.85) {
        animateTo(0);
      } else {
        animateTo(1);
      }
    }
  };

  // 2. Xử lý Native Touch Events (chạm & vuốt mượt mà trên thiết bị di động thật)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    stopAnimation();
    isDraggingRef.current = true;
    startYRef.current = e.touches[0].clientY;
    startProgressRef.current = progressRef.current;
    hasMovedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const clientY = e.touches[0].clientY;
    const dy = startYRef.current - clientY;
    if (Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }
    const dragRange = Math.max(90, sh * 0.3);
    const delta = dy / dragRange;
    const nextProg = Math.max(0, Math.min(1, startProgressRef.current + delta));
    setProgress(nextProg);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const current = progressRef.current;
    if (startProgressRef.current < 0.5) {
      if (current > 0.12) {
        animateTo(1);
      } else {
        animateTo(0);
      }
    } else {
      if (current < 0.85) {
        animateTo(0);
      } else {
        animateTo(1);
      }
    }
  };

  // 3. Xử lý Cuộn chuột / Trackpad scroll (Wheel event) khi test giao diện mobile
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    stopAnimation();
    e.stopPropagation();
    // Cuộn xuống (deltaY > 0): đẩy trang lên -> mở grid
    // Cuộn lên (deltaY < 0): kéo trang xuống -> hiện logo
    const delta = e.deltaY / Math.max(80, sh * 0.25);
    const nextProg = Math.max(0, Math.min(1, progressRef.current + delta));
    setProgress(nextProg);

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      const cur = progressRef.current;
      if (cur > 0.12) {
        animateTo(1);
      } else {
        animateTo(0);
      }
    }, 60);
  };

  // 4. Chạm hoặc Click nhanh: Bấm vào logo thì tự động cuộn lên mở grid ngay lập tức
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMovedRef.current) {
      if (progressRef.current < 0.5) {
        animateTo(1); // Bấm vào là cuộn lên để hiện lưới ngay
      } else {
        animateTo(0); // Bấm khi đang mở lưới thì kéo logo xuống
      }
    }
  };

  // Chiều cao logo responsive theo thao tác người dùng (co ngắn khi vuốt lên, dãn dài khi vuốt xuống)
  const logoHeight = Math.round(sh * (1 - progress));

  return (
    <div
      className="relative w-full h-full pointer-events-auto touch-none select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onWheel={handleWheel}
      onClick={handleClick}
    >
      <svg
        className="w-full h-full block"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mẫu sọc chéo 45 độ, nét liền, đen, mỏng (1px) */}
          <pattern
            id="blvd-portrait-hatch"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="#000000"
              strokeWidth="1"
            />
          </pattern>

          {/* Vùng clip để để lộ lưới phía dưới đáy logo khi logo co ngắn lại */}
          <clipPath id="blvd-portrait-grid-clip">
            <rect
              x={0}
              y={sy + logoHeight}
              width={W}
              height={Math.max(0, H - (sy + logoHeight))}
            />
          </clipPath>
        </defs>

        {/* CÁC PHẦN TỬ CỦA GRID ĐƯỢC CLIP DƯỚI ĐÁY LOGO:
            - Khi logo phủ kín safezone (logoHeight = sh): grid ẩn hoàn toàn phía dưới.
            - Khi logo co ngắn lại: grid ô vuông và sọc chéo cuộn dần xuất hiện.
            - Khi kéo hết (logoHeight = 0): toàn bộ grid hiển thị bình thường. */}
        <g clipPath="url(#blvd-portrait-grid-clip)">
          {/* Khoảng dư CẠNH TRÊN (phủ sọc chéo) */}
          {topH > 0 && (
            <rect
              x={sx}
              y={sy}
              width={sw}
              height={topH}
              fill="url(#blvd-portrait-hatch)"
              stroke="none"
            />
          )}

          {/* Khoảng dư CẠNH DƯỚI (phủ sọc chéo) */}
          {bottomH > 0 && (
            <rect
              x={sx}
              y={gridY + gridH}
              width={sw}
              height={bottomH}
              fill="url(#blvd-portrait-hatch)"
              stroke="none"
            />
          )}

          {/* Khung bao ngoài của vùng lưới Ô VUÔNG */}
          <rect
            x={gridX}
            y={gridY}
            width={gridW}
            height={gridH}
            fill="none"
            stroke="#000000"
            strokeWidth="1"
          />

          {/* Các đường kẻ dọc tạo nên Ô VUÔNG */}
          {verticalLines.map((xVal, idx) => (
            <line
              key={`pvl-${idx}`}
              x1={xVal}
              y1={gridY}
              x2={xVal}
              y2={gridY + gridH}
              stroke="#000000"
              strokeWidth="1"
            />
          ))}

          {/* Các đường kẻ ngang tạo nên Ô VUÔNG */}
          {horizontalLines.map((yVal, idx) => (
            <line
              key={`phl-${idx}`}
              x1={gridX}
              y1={yVal}
              x2={gridX + gridW}
              y2={yVal}
              stroke="#000000"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* LOGO #BLVD RESPONSIVE TRÊN MOBILE:
            - Stretch cả 2 chiều lấp đầy vùng safezone (hoặc chiều cao hiện tại khi vuốt).
            - Filled màu đen (#000000), không outline. */}
        {logoHeight > 0 && (
          <g>
            <svg
              x={sx}
              y={sy}
              width={sw}
              height={logoHeight}
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              className="pointer-events-none select-none overflow-hidden"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                textLength="100%"
                lengthAdjust="spacingAndGlyphs"
                className="font-archivo font-black select-none pointer-events-none"
                fontFamily="'Archivo', sans-serif"
                fontWeight="900"
                fontSize="148"
                fill="#000000"
                stroke="none"
              >
                #BLVD
              </text>
            </svg>

            {/* Đường viền ngăn cách sắc sảo (1px) ở đáy logo khi đang co dãn */}
            {logoHeight < sh && (
              <line
                x1={sx}
                y1={sy + logoHeight}
                x2={sx + sw}
                y2={sy + logoHeight}
                stroke="#000000"
                strokeWidth="1"
              />
            )}
          </g>
        )}

        {/* Viền ngoài cùng của Safezone (nét liền, đen, mỏng) */}
        <rect
          x={sx}
          y={sy}
          width={sw}
          height={sh}
          fill="none"
          stroke="#000000"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

