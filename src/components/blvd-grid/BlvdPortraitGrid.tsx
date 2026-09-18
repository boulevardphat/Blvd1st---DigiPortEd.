import React, { useState, useRef, useEffect } from 'react';
import { AppLanguage } from '../../types';
import { BLVD_INTRO_TEXT } from './blvdText';
import { BlvdTemplateExporter } from './BlvdTemplateExporter';

interface BlvdGridProps {
  width: number;
  height: number;
  language?: AppLanguage;
}

/**
 * BlvdPortraitGrid: GIAO DIỆN DỌC (PORTRAIT / MOBILE)
 * - Safezone: 6% chiều rộng và 5% chiều dọc (sx, sy, sw, sh).
 * - Giải quyết chuẩn xác 100% phản hồi của người dùng:
 *   1. Text giới thiệu nằm NGAY DƯỚI LOGO.
 *   2. Khi cuộn lên, Logo tiếp tục co lại cho đến khi BIẾN MẤT HOÀN TOÀN (height = 0):
 *      - Khối Text một mình DỪNG Ở CHÍNH GIỮA MÀN HÌNH (lấp trọn vẹn Safezone ở trung tâm).
 *      - Lớp kính mờ phủ kín full màn hình (bg-white/25 backdrop-blur-xl).
 *   3. TUYỆT ĐỐI KHÔNG BỊ LÓ GRID Ở DƯỚI ĐÁY:
 *      - Khi đang ở màn hình Text giới thiệu, Grid bị ẩn hoàn toàn (display: none / translateY > H).
 *      - Có khoảng dừng (plateau) thoải mái ở giữa để người dùng đọc văn bản mà không bị cấn hay lộ grid.
 *   4. Khi cuộn tiếp lên nữa:
 *      - Khối Text mới trượt lên trên và ra khỏi màn hình.
 *      - Lưới ô vuông (1:1) Safezone lúc này mới trượt từ dưới lên chiếm Safezone (opacity 0.2 mờ nhẹ).
 *   5. Smooth Scrolling mượt mà tự nhiên, KHÔNG CÓ CẢM GIÁC NAM CHÂM (không scroll-snap).
 *   6. Chuẩn Boulevard1st: Hoàn toàn không bo góc (rounded-none).
 */
export const BlvdPortraitGrid: React.FC<BlvdGridProps> = ({
  width: W,
  height: H,
  language = 'vi',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<'BLVD18' | 'BLVD17' | 'BLVD16'>('BLVD18');
  const [showTabs, setShowTabs] = useState(false); // Mặc định ở mobile: đang cân nhắc vuốt dọc hoặc tab

  const TABS = [
    { id: 'BLVD18', label: '#BLVD18' },
    { id: 'BLVD17', label: '#BLVD17' },
    { id: 'BLVD16', label: '#BLVD16' },
  ] as const;

  // 1. Safezone cho màn hình dọc (6% ngang, 5% dọc)
  const marginX = Math.round(Math.max(20, W * 0.06));
  const marginY = Math.round(Math.max(24, H * 0.05));
  const sx = marginX;
  const sy = marginY;
  const sw = Math.max(10, W - 2 * marginX);
  const sh = Math.max(10, H - 2 * marginY);

  // 2. Chia Safezone thành các Ô VUÔNG (1:1)
  const targetCellSize = 38;
  const cols = Math.max(1, Math.round(sw / targetCellSize));
  const cellSize = sw / cols;

  const rows = Math.max(1, Math.floor(sh / cellSize));
  const gridW = sw;
  const gridH = rows * cellSize;

  const excessY = Math.max(0, sh - gridH);
  const topH = Math.round(excessY / 2);
  const bottomH = excessY - topH;
  const gridY = topH;

  // Danh sách toạ độ các đường kẻ dọc (tương đối trong Safezone)
  const verticalLines: number[] = [];
  for (let c = 1; c < cols; c++) {
    verticalLines.push(c * cellSize);
  }

  // Danh sách toạ độ các đường kẻ ngang (tương đối trong Safezone)
  const horizontalLines: number[] = [];
  for (let r = 1; r < rows; r++) {
    horizontalLines.push(gridY + r * cellSize);
  }

  // 3. Hệ thống cuộn mượt mà tự nhiên (không nam châm)
  const scrollStep = Math.max(220, Math.round(H * 0.75));
  const totalScroll = Math.round(scrollStep * 2.4);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // Hỗ trợ kéo chuột trên desktop để test
  const isMouseDownRef = useRef(false);
  const startMouseYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDownRef.current = true;
    startMouseYRef.current = e.clientY;
    if (containerRef.current) {
      startScrollTopRef.current = containerRef.current.scrollTop;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !containerRef.current) return;
    const dy = e.clientY - startMouseYRef.current;
    containerRef.current.scrollTop = startScrollTopRef.current - dy;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  useEffect(() => {
    const onWindowMouseUp = () => {
      isMouseDownRef.current = false;
    };
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => {
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, []);

  // 4. Tính toán phân đoạn chuyển động:
  // normalizedProgress từ 0 -> 2.4
  const progress = scrollY / Math.max(1, scrollStep);

  let currentLogoH = sh;
  let currentIntroH = 0;
  let cardTranslateY = 0;
  let gridTranslateY = H + 100;
  let isGridVisible = false;
  let blurRatio = 0;

  if (progress <= 1.0) {
    // Giai đoạn 1 (0 -> 1.0):
    // - Logo co dãn từ sh xuống 0 (mất hẳn).
    // - Text nằm ngay dưới chân logo trồi dần lên từ 0 đến sh.
    // - Lớp kính mờ FULL MÀN HÌNH xuất hiện từ từ theo độ cuộn (blurRatio từ 0 -> 1).
    // - Grid TUYỆT ĐỐI ẨN (không ló một chút nào).
    const t1 = Math.max(0, Math.min(1, progress));
    currentLogoH = Math.round(sh * (1 - t1));
    currentIntroH = sh - currentLogoH;
    cardTranslateY = 0;
    gridTranslateY = H + 100;
    isGridVisible = false;
    blurRatio = t1;
  } else if (progress <= 1.4) {
    // Giai đoạn 2 (1.0 -> 1.4): KHOẢNG DỪNG (PLATEAU) Ở TRUNG TÂM MÀN HÌNH
    // - Logo đã mất hẳn (currentLogoH = 0).
    // - Text nằm chính giữa màn hình (currentIntroH = sh), khung viền khép kín, trong suốt.
    // - Lớp kính mờ FULL MÀN HÌNH đạt độ mờ tối đa (blurRatio = 1.0).
    // - Grid VẪN ẨN HOÀN TOÀN, không ló một milimet nào.
    currentLogoH = 0;
    currentIntroH = sh;
    cardTranslateY = 0;
    gridTranslateY = H + 100;
    isGridVisible = false;
    blurRatio = 1.0;
  } else {
    // Giai đoạn 3 (1.4 -> 2.2):
    // - Khối Text trượt lên trên và ra khỏi màn hình (cardTranslateY từ 0 -> -(H + 40)).
    // - Lưới Grid trượt từ dưới lên chiếm Safezone (gridTranslateY từ H -> 0).
    // - Lớp kính mờ FULL MÀN HÌNH biến mất từ từ theo độ cuộn (blurRatio từ 1 -> 0).
    const t3 = Math.max(0, Math.min(1, (progress - 1.4) / 0.8));
    currentLogoH = 0;
    currentIntroH = sh;
    cardTranslateY = -Math.round(t3 * (H + 40));
    gridTranslateY = Math.round((1 - t3) * H);
    isGridVisible = true;
    blurRatio = Math.max(0, 1 - t3);
  }

  const introText = BLVD_INTRO_TEXT[language] || BLVD_INTRO_TEXT.vi;
  const isVi = language === 'vi';
  const topLineText = isVi ? 'ĐÂY LÀ' : 'WHAT IS';
  const bottomLineText = isVi ? '#BLVD' : '#BLVD?';

  // Độ mờ kính của lớp blur full màn hình biến thiên mượt mà từ 0 -> 24px:
  const blurPx = Math.round(24 * blurRatio);
  const blurBgAlpha = (0.25 * blurRatio).toFixed(3);

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden touch-pan-y"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 
        A. LỚP BLUR GIỚI THIỆU PHỦ FULL TOÀN BỘ MÀN HÌNH (100vw x 100vh):
        - Không phải là khung của text, mà phủ kín 100% không gian màn hình.
        - Xuất hiện từ từ khi vuốt lên (0 -> 24px blur) và biến mất từ từ khi cuộn tiếp (24px -> 0px blur).
      */}
      {blurRatio > 0 && (
        <div
          id="blvd-portrait-fullscreen-blur"
          style={{
            backdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
            WebkitBackdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
            backgroundColor: `rgba(255, 255, 255, ${blurBgAlpha})`,
            opacity: blurRatio > 0.01 ? 1 : 0,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
      )}

      {/* 
        B. LƯỚI Ô VUÔNG (1:1) SAFEZONE & SỌC CHÉO:
        - CHỈ HIỂN THỊ KHI BƯỚC VÀO GIAI ĐOẠN 3 (isGridVisible = true).
        - Tuyệt đối không bị ló 1 khúc ở đáy màn hình khi đang ở màn hình giới thiệu.
        - Opacity mờ nhẹ 0.2 thanh thoát.
      */}
      {isGridVisible && (
        <div
          id="blvd-portrait-grid-layer"
          style={{
            transform: `translateY(${gridTranslateY}px)`,
            willChange: 'transform',
          }}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <svg
            className="w-full h-full block"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="blvd-portrait-hatch-active"
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
            </defs>

            {/* LỚP LƯỚI Ô VUÔNG & SỌC CHÉO: Opacity mờ nhẹ 0.2 */}
            <g id="blvd-portrait-grid-mesh" opacity="0.2">
              {/* Khoảng dư CẠNH TRÊN (phủ sọc chéo) */}
              {topH > 0 && (
                <rect
                  x={sx}
                  y={sy}
                  width={sw}
                  height={topH}
                  fill="url(#blvd-portrait-hatch-active)"
                  stroke="none"
                />
              )}

              {/* Khoảng dư CẠNH DƯỚI (phủ sọc chéo) */}
              {bottomH > 0 && (
                <rect
                  x={sx}
                  y={sy + gridY + gridH}
                  width={sw}
                  height={bottomH}
                  fill="url(#blvd-portrait-hatch-active)"
                  stroke="none"
                />
              )}

              {/* Khung bao ngoài của vùng lưới Ô VUÔNG */}
              <rect
                x={sx}
                y={sy + gridY}
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
                  x1={sx + xVal}
                  y1={sy + gridY}
                  x2={sx + xVal}
                  y2={sy + gridY + gridH}
                  stroke="#000000"
                  strokeWidth="1"
                />
              ))}

              {/* Các đường kẻ ngang tạo nên Ô VUÔNG */}
              {horizontalLines.map((yVal, idx) => (
                <line
                  key={`phl-${idx}`}
                  x1={sx}
                  y1={sy + yVal}
                  x2={sx + sw}
                  y2={sy + yVal}
                  stroke="#000000"
                  strokeWidth="1"
                />
              ))}

              {/* Viền ngoài cùng của Safezone Grid */}
              <rect
                x={sx}
                y={sy}
                width={sw}
                height={sh}
                fill="none"
                stroke="#000000"
                strokeWidth="1"
              />
            </g>

            {/* Viền tĩnh Safezone */}
            <rect
              x={sx}
              y={sy}
              width={sw}
              height={sh}
              fill="none"
              stroke="#000000"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          </svg>

          {/* Lớp 3 Tab trên Mobile khi người dùng bật tùy chọn hiển thị Tab */}
          {showTabs && (
            <div
              id="blvd-portrait-flat-tabs-overlay"
              style={{
                position: 'absolute',
                left: `${sx}px`,
                top: `${sy + gridY}px`,
                width: `${sw}px`,
                height: `${cellSize}px`,
              }}
              className="z-30 pointer-events-auto flex items-stretch select-none"
            >
              {TABS.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={`p-tab-btn-${tab.id}`}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 h-full flex items-center justify-center transition-colors duration-100 cursor-pointer rounded-none outline-none border-b border-r border-black ${
                      idx === 0 ? 'border-l' : ''
                    } ${
                      isActive
                        ? 'bg-black text-white font-extrabold'
                        : 'bg-white/30 hover:bg-white/50 text-black font-bold'
                    }`}
                  >
                    <span className="font-archivo text-[12px] tracking-[0.05em] uppercase whitespace-nowrap select-none">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 
        C. CỤM SAFEZONE: LOGO CO LẠI ĐẾN MẤT HẲN + TEXT DỪNG Ở CHÍNH GIỮA MÀN HÌNH:
        - Tọa độ cố định tại Safezone trung tâm màn hình: sx, sy, sw, sh.
        - Text nằm NGAY DƯỚI CHÂN LOGO.
        - Khi cuộn, Logo co lại từ sh -> 0 (mất hẳn).
        - Khi Logo = 0, khối Text chiếm trọn vẹn Safezone ở chính giữa màn hình.
      */}
      <div
        id="blvd-portrait-card-wrapper"
        style={{
          position: 'absolute',
          left: `${sx}px`,
          top: `${sy}px`,
          width: `${sw}px`,
          height: `${sh}px`,
          transform: `translateY(${cardTranslateY}px)`,
          willChange: 'transform',
        }}
        className="pointer-events-none z-30 select-none overflow-hidden rounded-none"
      >
        {/* 1. KHUNG LOGO #BLVD CO DÃN:
            - Co lại liên tục từ sh xuống 0 để mất hoàn toàn */}
        {currentLogoH > 0 && (
          <div
            id="blvd-portrait-logo-box"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${sw}px`,
              height: `${currentLogoH}px`,
            }}
            className="border border-black overflow-hidden bg-transparent rounded-none"
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
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
          </div>
        )}

        {/* 2. KHỐI TEXT GIỚI THIỆU NẰM NGAY DƯỚI LOGO:
            - Chiều dài textbox bằng đúng chiều dài Safezone (height: sh, width: sw).
            - 2 dòng text ở đầu và đuôi theo style Mục Lục / Table of Contents nằm ngang:
              + Đầu: "GIỚI" (VI) / "WHAT IS" (EN)
              + Đuôi: "THIỆU" (VI) / "#BLVD?" (EN)
            - Không gian ở giữa rộng rãi dành cho đoạn text giới thiệu. */}
        {progress > 0 && (
          <div
            id="blvd-portrait-intro-box"
            style={{
              position: 'absolute',
              left: 0,
              top: `${currentLogoH}px`,
              width: `${sw}px`,
              height: `${sh}px`,
            }}
            className="p-1 sm:p-2 flex flex-col justify-between select-none rounded-none bg-transparent border-none overflow-hidden"
          >
            {/* DÒNG ĐẦU: "ĐÂY LÀ" (VI) / "WHAT IS" (EN) - Phủ tối cho text, giảm opacity để chữ dễ đọc rõ ràng */}
            <div className="w-full shrink-0 select-none pointer-events-none h-24 sm:h-28">
              <svg
                viewBox="0 0 400 120"
                className="w-full h-full block overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="blvd-grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a0a04" />
                    <stop offset="40%" stopColor="#2c1006" />
                    <stop offset="80%" stopColor="#0a0502" />
                  </linearGradient>
                  <pattern id="blvd-bg-pattern-top" patternUnits="userSpaceOnUse" width="400" height="120">
                    <rect width="400" height="120" fill="url(#blvd-grad-top)" />
                    <image
                      href="https://i.ibb.co/ccfZG4Zk/n-n-blvd18.webp"
                      x="0"
                      y="0"
                      width="400"
                      height="120"
                      preserveAspectRatio="xMidYMid slice"
                      crossOrigin="anonymous"
                    />
                    {/* Lớp phủ tối sâu trên vân nền để tạo độ tương phản */}
                    <rect width="400" height="120" fill="#000000" opacity="0.65" />
                  </pattern>
                </defs>
                <g opacity="0.25" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
                  {/* Lớp lót đen định hình dáng chữ rõ nét */}
                  <text
                    x="0"
                    y="96"
                    fontFamily="Archivo, 'Be Vietnam Pro', sans-serif"
                    fontWeight="900"
                    fontStyle="italic"
                    fontSize="106"
                    textLength="400"
                    lengthAdjust="spacingAndGlyphs"
                    fill="#000000"
                    opacity="0.4"
                  >
                    {topLineText}
                  </text>
                  {/* Lớp vân nền dự án đã phủ tối */}
                  <text
                    x="0"
                    y="96"
                    fontFamily="Archivo, 'Be Vietnam Pro', sans-serif"
                    fontWeight="900"
                    fontStyle="italic"
                    fontSize="106"
                    textLength="400"
                    lengthAdjust="spacingAndGlyphs"
                    fill="url(#blvd-bg-pattern-top)"
                  >
                    {topLineText}
                  </text>
                </g>
              </svg>
            </div>

            {/* KHÔNG GIAN Ở GIỮA DÀNH CHO TEXT GIỚI THIỆU - MÀU ĐEN THUẦN RÕ RÀNG */}
            <div className="flex-1 flex flex-col justify-center my-2 sm:my-3 select-none overflow-y-auto no-scrollbar px-0.5">
              <p className="font-archivo font-medium text-black text-[clamp(15px,4.2vw,18.5px)] leading-[1.65] tracking-normal text-justify">
                {introText}
              </p>
            </div>

            {/* DÒNG ĐUÔI: "#BLVD" (VI) / "#BLVD?" (EN) - Phủ tối cho text, giảm opacity để chữ dễ đọc rõ ràng */}
            <div className="w-full shrink-0 select-none pointer-events-none h-24 sm:h-28">
              <svg
                viewBox="0 0 400 120"
                className="w-full h-full block overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="blvd-grad-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a0a04" />
                    <stop offset="40%" stopColor="#2c1006" />
                    <stop offset="80%" stopColor="#0a0502" />
                  </linearGradient>
                  <pattern id="blvd-bg-pattern-bottom" patternUnits="userSpaceOnUse" width="400" height="120">
                    <rect width="400" height="120" fill="url(#blvd-grad-bottom)" />
                    <image
                      href="https://i.ibb.co/ccfZG4Zk/n-n-blvd18.webp"
                      x="0"
                      y="0"
                      width="400"
                      height="120"
                      preserveAspectRatio="xMidYMid slice"
                      crossOrigin="anonymous"
                    />
                    {/* Lớp phủ tối sâu trên vân nền để tạo độ tương phản */}
                    <rect width="400" height="120" fill="#000000" opacity="0.65" />
                  </pattern>
                </defs>
                <g opacity="0.25" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
                  {/* Lớp lót đen định hình dáng chữ rõ nét */}
                  <text
                    x="0"
                    y="96"
                    fontFamily="Archivo, 'Be Vietnam Pro', sans-serif"
                    fontWeight="900"
                    fontStyle="italic"
                    fontSize="106"
                    textLength="400"
                    lengthAdjust="spacingAndGlyphs"
                    fill="#000000"
                    opacity="0.4"
                  >
                    {bottomLineText}
                  </text>
                  {/* Lớp vân nền dự án đã phủ tối */}
                  <text
                    x="0"
                    y="96"
                    fontFamily="Archivo, 'Be Vietnam Pro', sans-serif"
                    fontWeight="900"
                    fontStyle="italic"
                    fontSize="106"
                    textLength="400"
                    lengthAdjust="spacingAndGlyphs"
                    fill="url(#blvd-bg-pattern-bottom)"
                  >
                    {bottomLineText}
                  </text>
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 
        D. NATIVE SMOOTH SCROLL CONTAINER (KHÔNG CẢM GIÁC NAM CHÂM):
        - Hoàn toàn KHÔNG dùng scroll-snap.
        - Dừng tự do ở bất kỳ điểm nào, không bị giật hay kéo hút.
      */}
      <div
        ref={containerRef}
        id="blvd-portrait-native-scroll"
        className="relative w-full h-full overflow-y-auto no-scrollbar overscroll-none touch-pan-y z-40"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        onScroll={handleScroll}
      >
        <div
          style={{ height: `${H + totalScroll}px`, width: '100%' }}
          className="pointer-events-none"
        />
      </div>

      {/* Mô-đun xuất Template Canva cho Mobile - Độc lập, dễ dàng bỏ sau này */}
      <BlvdTemplateExporter
        showTabs={showTabs}
        onToggleShowTabs={(val) => setShowTabs(val)}
        gridInfo={{
          isMobile: true,
          canvasWidth: W,
          canvasHeight: H,
          cellSize,
          cols,
          rows,
          marginX,
          marginY,
          gridX: sx,
          gridY: sy + gridY,
          gridW,
          gridH,
          tabStartX: sx,
          tabY: sy + gridY,
          tabH: cellSize,
          totalTabsW: sw,
          tabW: sw / 3,
          activeTabName: activeTab,
          showTabs,
        }}
      />
    </div>
  );
};
