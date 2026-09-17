import React from 'react';

interface BlvdGridProps {
  width: number;
  height: number;
}

/**
 * BlvdLandscapeGrid: Bố cục lưới Safezone riêng biệt cho GIAO DIỆN NGANG (LANDSCAPE)
 * - Safezone: 6.5% chiều rộng và 6.5% chiều cao (khớp với margin landscape của dự án).
 * - Lưới Ô VUÔNG (1:1): Căng tràn 100% chiều ngang Safezone (gridW = sw), không có khoảng dư ở 2 bên trái/phải.
 * - Khoảng dư (Excess space) CHỈ xuất hiện ở CẠNH TRÊN VÀ CẠNH DƯỚI, được phủ sọc chéo 45 độ.
 * - Toàn bộ viền Safezone, đường chia ô vuông và sọc chéo dùng nét liền, đen (#000000) và mỏng (1px).
 * - Không bo góc (chuẩn Boulevard1st).
 */
export const BlvdLandscapeGrid: React.FC<BlvdGridProps> = ({ width: W, height: H }) => {
  // 1. Xác định Safezone cho màn hình ngang (6.5% mỗi cạnh)
  const marginX = Math.round(W * 0.065);
  const marginY = Math.round(H * 0.065);
  const sx = marginX;
  const sy = marginY;
  const sw = Math.max(10, W - 2 * marginX);
  const sh = Math.max(10, H - 2 * marginY);

  // 2. Chia Safezone theo chiều ngang thành các Ô VUÔNG (1:1)
  // Target cell size khoảng ~46px - 52px cho màn hình ngang
  const targetCellSize = 48;
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

  // 3. Logo #BLVD ở Desktop:
  // - Cố định luôn 4 hàng ô ở dưới làm "bệ đỡ" kiến trúc thoáng đãng
  // - Quy định chiều cao tối đa của logo: logoRows = Math.max(3, rows - 4)
  // - Bảo toàn tỷ lệ đứng: logoCols = logoRows - 2 (cao hơn rộng đúng 2 ô)
  const bottomPaddingRows = 4;
  let logoRows = Math.max(3, rows - bottomPaddingRows);
  let logoCols = Math.max(2, Math.min(cols - 2, logoRows - 2));
  // Đồng bộ lại logoRows để đảm bảo cao hơn rộng đúng 2 ô
  logoRows = logoCols + 2;

  const logoW = logoCols * cellSize;
  const logoH = logoRows * cellSize;
  const logoX = gridX;
  const logoY = gridY;

  // Danh sách toạ độ các đường kẻ dọc (bên trong lưới ô vuông, né khung logo ở góc trên bên trái)
  const verticalLines: { x: number; y1: number; y2: number }[] = [];
  for (let c = 1; c < cols; c++) {
    const xVal = gridX + c * cellSize;
    const yStart = c < logoCols ? gridY + logoH : gridY;
    verticalLines.push({ x: xVal, y1: yStart, y2: gridY + gridH });
  }

  // Danh sách toạ độ các đường kẻ ngang (bên trong lưới ô vuông, né khung logo ở góc trên bên trái)
  const horizontalLines: { y: number; x1: number; x2: number }[] = [];
  for (let r = 1; r < rows; r++) {
    const yVal = gridY + r * cellSize;
    const xStart = r < logoRows ? gridX + logoW : gridX;
    horizontalLines.push({ y: yVal, x1: xStart, x2: gridX + gridW });
  }

  return (
    <svg
      className="w-full h-full block"
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

      {/* Các đường kẻ dọc tạo nên Ô VUÔNG (né vùng khung logo) */}
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

      {/* Các đường kẻ ngang tạo nên Ô VUÔNG (né vùng khung logo) */}
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

      {/* Chữ #BLVD stretch cả 2 chiều lấp đầy 100% khung hình chữ nhật đứng (filled, không outline) */}
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
  );
};
