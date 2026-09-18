import React, { useState } from 'react';
import { Download, X, Copy, Check, FileImage, LayoutGrid, Eye, EyeOff } from 'lucide-react';

export interface GridTemplateInfo {
  isMobile: boolean;
  canvasWidth: number;
  canvasHeight: number;
  cellSize: number;
  cols: number;
  rows: number;
  marginX: number;
  marginY: number;
  gridX: number;
  gridY: number;
  gridW: number;
  gridH: number;
  logoCols?: number;
  logoRows?: number;
  introRows?: number;
  logoW?: number;
  logoH?: number;
  introH?: number;
  tabStartX?: number;
  tabY?: number;
  tabH?: number;
  totalTabsW?: number;
  tabW?: number;
  activeTabName?: string;
  showTabs?: boolean;
}

interface BlvdTemplateExporterProps {
  gridInfo: GridTemplateInfo;
  showTabs?: boolean;
  onToggleShowTabs?: (show: boolean) => void;
}

/**
 * BlvdTemplateExporter - Mô đun xuất Template Canva / Thiết kế cho Boulevard1st:
 * - Hỗ trợ cả Desktop (Landscape) lẫn Mobile (Portrait).
 * - Hỗ trợ tùy chọn HIỆN / ẨN HÀNG NÚT TAB (cho phép cân nhắc chuyển đổi dạng Tab hay Vuốt dọc tự do).
 * - 100% Độc lập và mô-đun hóa, dễ dàng xóa bỏ sau này.
 */
export const BlvdTemplateExporter: React.FC<BlvdTemplateExporterProps> = ({
  gridInfo,
  showTabs = true,
  onToggleShowTabs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bgStyle, setBgStyle] = useState<'transparent' | 'light' | 'dark'>('transparent');
  const [showGuides, setShowGuides] = useState(true);

  const { isMobile, canvasWidth: W, canvasHeight: H, gridX, gridY, gridW, gridH, cellSize } = gridInfo;

  // Tính toán vùng làm việc nội dung tab / nội dung trang
  const tabContentX = Math.round(
    isMobile ? gridX : (gridInfo.tabStartX ?? gridX + (gridInfo.logoW ?? 0))
  );
  const tabContentY = Math.round(
    isMobile
      ? (showTabs ? gridY + (gridInfo.tabH ?? cellSize) : gridY)
      : (showTabs ? (gridInfo.tabY ?? gridY) + (gridInfo.tabH ?? cellSize) : gridY)
  );
  const tabContentW = Math.round(
    isMobile ? gridW : (gridInfo.totalTabsW ?? gridW)
  );
  const tabContentH = Math.round(
    isMobile
      ? (showTabs ? gridH - (gridInfo.tabH ?? cellSize) : gridH)
      : (showTabs ? gridH - (gridInfo.tabH ?? cellSize) : gridH)
  );

  const activeTabLabel = gridInfo.activeTabName || 'Nội dung';

  const specSummary = `[BOULEVARD1ST - CANVA TEMPLATE SPECS (${isMobile ? 'MOBILE / DỌC' : 'DESKTOP / NGANG'})]
• Kích thước khung Canvas (Canva Size): ${W} x ${H} px (Tỉ lệ ${(W / H).toFixed(2)}:1)
• Safezone (Lề): Left/Right = ${gridInfo.marginX}px | Top/Bottom = ${gridInfo.marginY}px
• Vùng lưới an toàn (Grid Area): ${Math.round(gridW)} x ${Math.round(gridH)} px (${gridInfo.cols} cột x ${gridInfo.rows} hàng)
• Kích thước mỗi ô vuông (Cell Size): ${Math.round(cellSize)}px
• Chế độ hiển thị Tab: ${showTabs ? 'ĐANG BẬT HÀNG TAB' : 'TẮT TAB (CHẾ ĐỘ VUỐT CUỘN TRÊN XUỐNG)'}
${!isMobile ? `• Khối bên trái (Logo #BLVD + Intro): ${Math.round(gridInfo.logoW ?? 0)} x ${Math.round((gridInfo.logoH ?? 0) + (gridInfo.introH ?? 0))} px` : '• Giao diện Mobile: Cuộn mượt toàn màn hình'}
• VÙNG THIẾT KẾ NỘI DUNG (${showTabs ? `Tab ${activeTabLabel}` : 'Toàn bộ vùng nội dung'}):
  - Tọa độ bắt đầu: X = ${tabContentX}px, Y = ${tabContentY}px
  - Kích thước: Rộng ${tabContentW}px x Cao ${tabContentH}px`;

  const handleCopySpecs = () => {
    try {
      navigator.clipboard.writeText(specSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  // Tạo nội dung SVG chuẩn xác
  const generateSvgString = () => {
    const bgRect =
      bgStyle === 'light'
        ? `<rect width="${W}" height="${H}" fill="#FAFAFA"/>`
        : bgStyle === 'dark'
        ? `<rect width="${W}" height="${H}" fill="#121212"/>`
        : '';

    const strokeColor = bgStyle === 'dark' ? '#555555' : '#000000';
    const textColor = bgStyle === 'dark' ? '#FFFFFF' : '#000000';
    const guideFill = bgStyle === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
    const activeTabFill = bgStyle === 'dark' ? '#FFFFFF' : '#000000';
    const activeTabText = bgStyle === 'dark' ? '#000000' : '#FFFFFF';

    // Đường kẻ dọc
    let verticalSvg = '';
    for (let c = 1; c < gridInfo.cols; c++) {
      const xVal = Math.round(gridX + c * cellSize);
      let yStart = gridY;
      if (!isMobile && gridInfo.logoCols && c < gridInfo.logoCols) {
        yStart = Math.round(gridY + (gridInfo.logoH ?? 0) + (gridInfo.introH ?? 0));
      } else if (showTabs) {
        yStart = Math.round(gridY + (gridInfo.tabH ?? cellSize));
      }
      if (yStart < gridY + gridH) {
        verticalSvg += `<line x1="${xVal}" y1="${yStart}" x2="${xVal}" y2="${Math.round(gridY + gridH)}" stroke="${strokeColor}" stroke-width="1" stroke-dasharray="2 2" stroke-opacity="0.35"/>`;
      }
    }

    // Đường kẻ ngang
    let horizontalSvg = '';
    for (let r = 1; r < gridInfo.rows; r++) {
      const yVal = Math.round(gridY + r * cellSize);
      const isInsideLeft = !isMobile && r < Math.round(((gridInfo.logoH ?? 0) + (gridInfo.introH ?? 0)) / cellSize);
      const xStart = isInsideLeft ? Math.round(gridX + (gridInfo.logoW ?? 0)) : Math.round(gridX);
      horizontalSvg += `<line x1="${xStart}" y1="${yVal}" x2="${Math.round(gridX + gridW)}" stroke="${strokeColor}" stroke-width="1" stroke-dasharray="2 2" stroke-opacity="0.35"/>`;
    }

    let leftBlockSvg = '';
    if (!isMobile && gridInfo.logoW && gridInfo.logoH) {
      leftBlockSvg = `
        <!-- Khung bên trái (Logo #BLVD + Intro) -->
        <rect x="${Math.round(gridX)}" y="${Math.round(gridY)}" width="${Math.round(gridInfo.logoW)}" height="${Math.round(gridInfo.logoH + (gridInfo.introH ?? 0))}" fill="${guideFill}" stroke="${strokeColor}" stroke-width="1.5"/>
        <text x="${Math.round(gridX + gridInfo.logoW / 2)}" y="${Math.round(gridY + gridInfo.logoH / 2)}" font-family="'Archivo', sans-serif" font-weight="900" font-size="28" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">KHU VỰC LOGO #BLVD</text>
        <text x="${Math.round(gridX + gridInfo.logoW / 2)}" y="${Math.round(gridY + gridInfo.logoH + (gridInfo.introH ?? 0) / 2)}" font-family="'Archivo', sans-serif" font-weight="600" font-size="14" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">4 HÀNG GIỚI THIỆU</text>
      `;
    }

    let tabsSvg = '';
    if (showTabs) {
      const tX = Math.round(isMobile ? gridX : (gridInfo.tabStartX ?? gridX));
      const tY = Math.round(isMobile ? gridY : (gridInfo.tabY ?? gridY));
      const tH = Math.round(gridInfo.tabH ?? cellSize);
      const tW = Math.round(isMobile ? gridW / 3 : (gridInfo.tabW ?? gridW / 3));

      tabsSvg = `
        <!-- Hàng 3 nút Tab -->
        <rect x="${tX}" y="${tY}" width="${tW}" height="${tH}" fill="${activeTabLabel === 'BLVD18' ? activeTabFill : guideFill}" stroke="${strokeColor}" stroke-width="1"/>
        <text x="${Math.round(tX + tW / 2)}" y="${Math.round(tY + tH / 2)}" font-family="'Archivo', sans-serif" font-weight="700" font-size="15" fill="${activeTabLabel === 'BLVD18' ? activeTabText : textColor}" text-anchor="middle" dominant-baseline="middle">#BLVD18</text>

        <rect x="${Math.round(tX + tW)}" y="${tY}" width="${tW}" height="${tH}" fill="${activeTabLabel === 'BLVD17' ? activeTabFill : guideFill}" stroke="${strokeColor}" stroke-width="1"/>
        <text x="${Math.round(tX + 1.5 * tW)}" y="${Math.round(tY + tH / 2)}" font-family="'Archivo', sans-serif" font-weight="700" font-size="15" fill="${activeTabLabel === 'BLVD17' ? activeTabText : textColor}" text-anchor="middle" dominant-baseline="middle">#BLVD17</text>

        <rect x="${Math.round(tX + 2 * tW)}" y="${tY}" width="${tW}" height="${tH}" fill="${activeTabLabel === 'BLVD16' ? activeTabFill : guideFill}" stroke="${strokeColor}" stroke-width="1"/>
        <text x="${Math.round(tX + 2.5 * tW)}" y="${Math.round(tY + tH / 2)}" font-family="'Archivo', sans-serif" font-weight="700" font-size="15" fill="${activeTabLabel === 'BLVD16' ? activeTabText : textColor}" text-anchor="middle" dominant-baseline="middle">#BLVD16</text>
      `;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      ${bgRect}
      
      <!-- Safezone Outer Border -->
      <rect x="${Math.round(gridX)}" y="${Math.round(gridY)}" width="${Math.round(gridW)}" height="${Math.round(gridH)}" fill="none" stroke="${strokeColor}" stroke-width="2"/>
      
      ${leftBlockSvg}

      <!-- Đường lưới mờ -->
      ${verticalSvg}
      ${horizontalSvg}

      ${tabsSvg}

      <!-- VÙNG NỘI DUNG CHÍNH CẦN THIẾT KẾ -->
      <rect x="${tabContentX}" y="${tabContentY}" width="${tabContentW}" height="${tabContentH}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-dasharray="8 6"/>
      ${
        showGuides
          ? `<g>
              <text x="${Math.round(tabContentX + tabContentW / 2)}" y="${Math.round(tabContentY + tabContentH / 2 - 16)}" font-family="'Archivo', sans-serif" font-weight="800" font-size="${isMobile ? '18' : '22'}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">VÙNG THIẾT KẾ ${showTabs ? `TAB: ${activeTabLabel}` : 'VUỐT TỪ TRÊN XUỐNG'}</text>
              <text x="${Math.round(tabContentX + tabContentW / 2)}" y="${Math.round(tabContentY + tabContentH / 2 + 16)}" font-family="'Archivo', sans-serif" font-weight="500" font-size="${isMobile ? '13' : '15'}" fill="${textColor}" opacity="0.75" text-anchor="middle" dominant-baseline="middle">${tabContentW} x ${tabContentH} px (X: ${tabContentX}, Y: ${tabContentY})</text>
            </g>`
          : ''
      }
    </svg>`;
  };

  // Tải file SVG
  const handleDownloadSvg = () => {
    const svgStr = generateSvgString();
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const modeTag = isMobile ? 'mobile' : 'desktop';
    const tabTag = showTabs ? 'tabs' : 'scroll';
    link.download = `blvd-template-${modeTag}-${tabTag}-${W}x${H}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Tải file PNG
  const handleDownloadPng = () => {
    const svgStr = generateSvgString();
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (bgStyle === 'light') {
          ctx.fillStyle = '#FAFAFA';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (bgStyle === 'dark') {
          ctx.fillStyle = '#121212';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const pngUrl = URL.createObjectURL(pngBlob);
            const link = document.createElement('a');
            link.href = pngUrl;
            const modeTag = isMobile ? 'mobile' : 'desktop';
            const tabTag = showTabs ? 'tabs' : 'scroll';
            link.download = `blvd-canva-template-${modeTag}-${tabTag}-${W}x${H}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
          }
        }, 'image/png');
      }
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <>
      {/* Nút pop-up kích hoạt nhỏ gọn ở góc dưới bên phải màn hình */}
      <button
        type="button"
        id="btn-open-canva-template-exporter"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-3 py-2 bg-black/90 hover:bg-black text-white text-xs font-archivo tracking-wider uppercase border border-white/25 rounded-none shadow-md cursor-pointer transition-colors select-none"
        title="Xuất template layout cho Canva"
      >
        <LayoutGrid className="w-3.5 h-3.5 text-[#EAD478]" />
        <span>Template Canva</span>
      </button>

      {/* Cửa sổ Popup Modal */}
      {isOpen && (
        <div
          id="blvd-template-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 select-none"
          onClick={() => setIsOpen(false)}
        >
          <div
            id="blvd-template-modal-card"
            className="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-black p-5 sm:p-6 rounded-none shadow-2xl flex flex-col gap-3.5 text-black animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black pb-2.5">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-black" />
                <h3 className="font-archivo font-extrabold text-sm sm:text-base tracking-wide uppercase">
                  Template Lưới Canva ({isMobile ? 'Mobile' : 'Desktop'})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/10 rounded-none cursor-pointer"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MỤC QUAN TRỌNG: TÙY CHỌN HIỆN NÚT TAB HOẶC VUỐT CUỘN */}
            <div className="p-3 bg-amber-50 border border-amber-300 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-archivo font-bold text-xs uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  {showTabs ? <Eye className="w-3.5 h-3.5 text-amber-800" /> : <EyeOff className="w-3.5 h-3.5 text-amber-800" />}
                  Hình thức điều hướng:
                </span>
                <button
                  type="button"
                  id="btn-toggle-show-tabs-option"
                  onClick={() => onToggleShowTabs?.(!showTabs)}
                  className={`px-2.5 py-1 text-xs font-archivo font-bold uppercase rounded-none border cursor-pointer transition-colors ${
                    showTabs
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-neutral-100'
                  }`}
                >
                  {showTabs ? 'Dùng 3 Nút Tab' : 'Vuốt từ trên xuống'}
                </button>
              </div>
              <p className="text-[11px] text-amber-900 leading-normal">
                {showTabs
                  ? '• Đang bật 3 nút Tab (#BLVD18, 17, 16): Template sẽ chừa hàng đầu tiên làm tab navigation.'
                  : '• Đang tắt 3 nút Tab (Vuốt dọc): Vùng thiết kế sẽ dùng trọn vẹn toàn bộ chiều cao để bạn bố cục theo dạng cuộn từ trên xuống.'}
              </p>
            </div>

            {/* Thông số kích thước quan trọng */}
            <div className="bg-neutral-100 p-3 border border-black/20 text-xs font-mono flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-neutral-600">Khung Canvas:</span>
                <span className="font-bold">{W} x {H} px ({isMobile ? 'Mobile' : 'Desktop'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Lưới Safezone:</span>
                <span>{Math.round(gridW)} x {Math.round(gridH)} px ({gridInfo.cols} x {gridInfo.rows} ô)</span>
              </div>
              <div className="flex justify-between text-black font-semibold pt-1 border-t border-black/10">
                <span>Vùng nội dung cần thiết kế:</span>
                <span className="text-black bg-yellow-200 px-1">{tabContentW} x {tabContentH} px</span>
              </div>
            </div>

            {/* Tùy chọn nền xuất */}
            <div className="flex items-center justify-between text-xs font-archivo">
              <span className="font-bold uppercase tracking-wider text-neutral-700">Kiểu nền file xuất:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setBgStyle('transparent')}
                  className={`px-2 py-1 border rounded-none text-xs cursor-pointer ${
                    bgStyle === 'transparent' ? 'bg-black text-white border-black font-bold' : 'bg-white border-neutral-300 text-neutral-700'
                  }`}
                >
                  Trong suốt (PNG)
                </button>
                <button
                  type="button"
                  onClick={() => setBgStyle('light')}
                  className={`px-2 py-1 border rounded-none text-xs cursor-pointer ${
                    bgStyle === 'light' ? 'bg-black text-white border-black font-bold' : 'bg-white border-neutral-300 text-neutral-700'
                  }`}
                >
                  Sáng
                </button>
                <button
                  type="button"
                  onClick={() => setBgStyle('dark')}
                  className={`px-2 py-1 border rounded-none text-xs cursor-pointer ${
                    bgStyle === 'dark' ? 'bg-black text-white border-black font-bold' : 'bg-white border-neutral-300 text-neutral-700'
                  }`}
                >
                  Tối
                </button>
              </div>
            </div>

            {/* Checkbox hiện chữ chú thích */}
            <label className="flex items-center gap-2 text-xs font-archivo cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showGuides}
                onChange={(e) => setShowGuides(e.target.checked)}
                className="w-3.5 h-3.5 accent-black rounded-none cursor-pointer"
              />
              <span className="text-neutral-700">In chữ chú thích vùng thiết kế lên ảnh template</span>
            </label>

            {/* Các nút hành động chính */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-black/10">
              <button
                type="button"
                onClick={handleDownloadPng}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-archivo font-bold tracking-wider uppercase rounded-none cursor-pointer transition-colors"
              >
                <FileImage className="w-4 h-4 text-[#EAD478]" />
                <span>Tải PNG Canva</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-black text-xs font-archivo font-bold tracking-wider uppercase border border-black/30 rounded-none cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải SVG Vector</span>
              </button>

              <button
                type="button"
                onClick={handleCopySpecs}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-neutral-100 text-black text-xs font-archivo font-bold tracking-wider uppercase border border-black rounded-none cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép' : 'Chép số đo'}</span>
              </button>
            </div>

            {/* Hướng dẫn ngắn */}
            <div className="text-[11px] text-neutral-500 font-sans leading-relaxed border-t border-neutral-200 pt-2">
              💡 <strong>Cách dùng trên Canva:</strong> Tạo thiết kế Canva đúng kích thước <code className="bg-neutral-200 px-1 py-0.5 text-black font-mono">{W}x{H}</code>, kéo thả ảnh PNG vào, khóa layer lại để dàn chữ & hình ảnh vừa khít từng ô.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
