import React from 'react';
import { AppLanguage } from '../../types';
import { BLVD_INTRO_TEXT } from './blvdText';

interface BlvdGridProps {
  width: number;
  height: number;
  language?: AppLanguage;
}

/**
 * BlvdLandscapeGrid: Bố cục lưới Safezone riêng biệt cho GIAO DIỆN NGANG (LANDSCAPE)
 * - Safezone: 6.5% chiều rộng và 6.5% chiều cao.
 * - Lưới Ô VUÔNG (1:1): Căng tràn 100% chiều ngang Safezone (gridW = sw).
 * - Khoảng dư CHỈ xuất hiện ở CẠNH TRÊN VÀ CẠNH DƯỚI, được phủ sọc chéo 45 độ.
 * - 4 hàng ô vuông ở dưới logo #BLVD dùng để chứa nội dung giới thiệu:
 *   + Tăng fontsize và weight (font-bold, đậm nét).
 *   + Màu chữ lấy chính nền làm màu (background-clip: text từ ảnh nền và gradient của dự án).
 *   + Lớp blur màu tối giảm opacity để chữ tương phản và đọc rõ.
 *   + Không bo góc (chuẩn Boulevard1st: rounded-none).
 */
export const BlvdLandscapeGrid: React.FC<BlvdGridProps> = ({ width: W, height: H, language = 'vi' }) => {
  // 1. Xác định Safezone cho màn hình ngang (6.5% mỗi cạnh)
  const marginX = Math.round(W * 0.065);
  const marginY = Math.round(H * 0.065);
  const sx = marginX;
  const sy = marginY;
  const sw = Math.max(10, W - 2 * marginX);
  const sh = Math.max(10, H - 2 * marginY);

  // 2. Chia Safezone theo chiều ngang thành các Ô VUÔNG (1:1)
  const targetCellSize = 48;
  const cols = Math.max(1, Math.round(sw / targetCellSize));
  const cellSize = sw / cols;

  // Số hàng ô vuông trọn vẹn fit được vào chiều cao Safezone
  const rows = Math.max(1, Math.floor(sh / cellSize));
  const gridW = sw;
  const gridH = rows * cellSize;

  // Căn giữa lưới theo trục dọc trong Safezone
  const gridX = sx;
  const excessY = Math.max(0, sh - gridH);
  const topH = Math.round(excessY / 2);
  const bottomH = excessY - topH;
  const gridY = sy + topH;

  // 3. Logo #BLVD & 4 Hàng Ô Chứa Nội Dung Giới Thiệu ở Desktop:
  // Chiều dài (chiều ngang) logo chiếm khoảng 40% tổng số ô theo chiều dài của Safezone
  const introRows = 4;
  const logoCols = Math.max(3, Math.min(cols - 2, Math.round(cols * 0.4)));
  const logoRows = Math.max(2, rows - introRows);

  const logoW = logoCols * cellSize;
  const logoH = logoRows * cellSize;
  const logoX = gridX;
  const logoY = gridY;

  // Toạ độ & kích thước của 4 hàng ô chứa text giới thiệu ở ngay dưới logo (bề rộng ~40% Safezone)
  const introX = logoX;
  const introY = logoY + logoH;
  const introW = logoW;
  const introH = Math.min(introRows * cellSize, (gridY + gridH) - introY);

  // Danh sách toạ độ các đường kẻ dọc (né khung logo và 4 hàng intro ở góc trái)
  const verticalLines: { x: number; y1: number; y2: number }[] = [];
  for (let c = 1; c < cols; c++) {
    const xVal = gridX + c * cellSize;
    const yStart = c < logoCols ? introY + introH : gridY;
    if (yStart < gridY + gridH) {
      verticalLines.push({ x: xVal, y1: yStart, y2: gridY + gridH });
    }
  }

  // Danh sách toạ độ các đường kẻ ngang (né khung logo và 4 hàng intro ở góc trái)
  const horizontalLines: { y: number; x1: number; x2: number }[] = [];
  for (let r = 1; r < rows; r++) {
    const yVal = gridY + r * cellSize;
    const isInsideLogoOrIntro = r < logoRows + introRows;
    const xStart = isInsideLogoOrIntro ? gridX + logoW : gridX;
    horizontalLines.push({ y: yVal, x1: xStart, x2: gridX + gridW });
  }

  const introText = BLVD_INTRO_TEXT[language] || BLVD_INTRO_TEXT.vi;

  return (
    <div className="relative w-full h-full select-none">
      <svg
        className="w-full h-full block absolute inset-0 pointer-events-none"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mẫu sọc chéo 45 độ, nét liền, đen, mỏng (1px) */}
          <pattern
            id="blvd-landscape-hatch"
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

        {/* LỚP LƯỚI Ô VUÔNG & SỌC CHÉO: Giảm opacity tối đa nhưng vẫn tạm thấy được (opacity 0.2) */}
        <g id="blvd-landscape-grid-mesh" opacity="0.2">
          {/* Khoảng dư CẠNH TRÊN (phủ sọc chéo) */}
          {topH > 0 && (
            <rect
              x={sx}
              y={sy}
              width={sw}
              height={topH}
              fill="url(#blvd-landscape-hatch)"
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
              fill="url(#blvd-landscape-hatch)"
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

          {/* Các đường kẻ dọc tạo nên Ô VUÔNG (né vùng khung logo & intro) */}
          {verticalLines.map((vLine, idx) => (
            <line
              key={`vl-${idx}`}
              x1={vLine.x}
              y1={vLine.y1}
              x2={vLine.x}
              y2={vLine.y2}
              stroke="#000000"
              strokeWidth="1"
            />
          ))}

          {/* Các đường kẻ ngang tạo nên Ô VUÔNG (né vùng khung logo & intro) */}
          {horizontalLines.map((hLine, idx) => (
            <line
              key={`hl-${idx}`}
              x1={hLine.x1}
              y1={hLine.y}
              x2={hLine.x2}
              y2={hLine.y}
              stroke="#000000"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Khung logo #BLVD hình chữ nhật đứng ở góc trên bên trái */}
        <rect
          x={logoX}
          y={logoY}
          width={logoW}
          height={logoH}
          fill="none"
          stroke="#000000"
          strokeWidth="1"
        />

        {/* Chữ #BLVD stretch cả 2 chiều lấp đầy 100% khung hình chữ nhật đứng */}
        <svg
          x={logoX}
          y={logoY}
          width={logoW}
          height={logoH}
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

        {/* Khung viền kỹ thuật cho 4 hàng ô chứa nội dung giới thiệu ở dưới logo */}
        <rect
          x={introX}
          y={introY}
          width={introW}
          height={introH}
          fill="none"
          stroke="#000000"
          strokeWidth="1"
        />

        {/* Viền ngoài cùng của Safezone */}
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

      {/* Lớp hiển thị nội dung giới thiệu trong 4 hàng ô dưới logo #BLVD:
          - Nền blur màu sáng giảm opacity (bg-white/25 backdrop-blur-md) theo yêu cầu.
          - Chiều ngang mở rộng ~40% tổng số ô Safezone, giúp text đọc thoải mái, rõ ràng.
          - justify-start với padding gọn gàng để text bắt đầu từ trên cùng, KHÔNG bị khuất chữ.
          - Font size & weight cân đối (font-bold), màu chữ lấy nền làm màu (background-clip: text).
          - Chuẩn Boulevard1st: Không bo góc (rounded-none). */}
      <div
        id="blvd-landscape-intro-box"
        style={{
          position: 'absolute',
          left: `${introX}px`,
          top: `${introY}px`,
          width: `${introW}px`,
          height: `${introH}px`,
        }}
        className="bg-white/25 backdrop-blur-md p-3.5 sm:p-4 flex flex-col justify-start select-none overflow-y-auto no-scrollbar rounded-none z-10 pointer-events-auto border-t border-black"
      >
        <p className="font-archivo font-medium text-black text-[clamp(14.5px,1.1vw,17px)] leading-[1.6] tracking-normal text-justify">
          {introText}
        </p>
      </div>
    </div>
  );
};
