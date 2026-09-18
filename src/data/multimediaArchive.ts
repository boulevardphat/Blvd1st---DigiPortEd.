import { PortfolioMode } from '../types';

export interface ArchiveAsset {
  id: string;
  title: string;
  project: string;
  category: string;
  mode: PortfolioMode;
  url: string;
  type?: 'image' | 'graphic' | 'poster' | 'badge' | 'map' | 'template';
}

export interface ProjectGroup {
  id: string;
  name: string;
  mode: PortfolioMode;
  category: string;
  description?: string;
  assets: ArchiveAsset[];
}

/**
 * KHO MULTIMEDIA ASSETS BOULEVARD1ST ARCHIVE
 * Lưu trữ cấu trúc toàn bộ 97 tài nguyên đồ hoạ & hình ảnh từ kho multimedia chính thức
 * Dành để sử dụng khi cần tích hợp vào Showcase / Portfolio / Gallery trong các phiên tiếp theo.
 */
export const BLVD_ARCHIVE_ASSETS: ArchiveAsset[] = [
  // ==========================================
  // EMPLOYER / CLUB: [#BLVD] #BLVD16 (10 assets)
  // ==========================================
  {
    id: 'emp-blvd16-1',
    title: '#BLVD16 - 01',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/1.webp',
  },
  {
    id: 'emp-blvd16-2',
    title: '#BLVD16 - 02',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/2.webp',
  },
  {
    id: 'emp-blvd16-3',
    title: '#BLVD16 - 03',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/3.webp',
  },
  {
    id: 'emp-blvd16-4',
    title: '#BLVD16 - 04',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/4.webp',
  },
  {
    id: 'emp-blvd16-5',
    title: '#BLVD16 - 05',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/5.webp',
  },
  {
    id: 'emp-blvd16-6',
    title: '#BLVD16 - 06',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/6.webp',
  },
  {
    id: 'emp-blvd16-7',
    title: '#BLVD16 - 07',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/7.webp',
  },
  {
    id: 'emp-blvd16-8',
    title: '#BLVD16 - 08',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/8.webp',
  },
  {
    id: 'emp-blvd16-9',
    title: '#BLVD16 - 09',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/9.webp',
  },
  {
    id: 'emp-blvd16-10',
    title: '#BLVD16 - 10',
    project: '#BLVD16',
    category: '[#BLVD] #BLVD16',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/10.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [#BLVD] #BLVD17 (8 assets)
  // ==========================================
  {
    id: 'emp-blvd17-1',
    title: '#BLVD17 - 01',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/1.webp',
  },
  {
    id: 'emp-blvd17-2',
    title: '#BLVD17 - 02',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/2.webp',
  },
  {
    id: 'emp-blvd17-3',
    title: '#BLVD17 - 03',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/3.webp',
  },
  {
    id: 'emp-blvd17-4',
    title: '#BLVD17 - 04',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/4.webp',
  },
  {
    id: 'emp-blvd17-5',
    title: '#BLVD17 - 05',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/5.webp',
  },
  {
    id: 'emp-blvd17-6',
    title: '#BLVD17 - 06',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/6.webp',
  },
  {
    id: 'emp-blvd17-7',
    title: '#BLVD17 - 07',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/7.webp',
  },
  {
    id: 'emp-blvd17-8',
    title: '#BLVD17 - 08',
    project: '#BLVD17',
    category: '[#BLVD] #BLVD17',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD17/8.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [#BLVD] #BLVD18 (6 assets)
  // ==========================================
  {
    id: 'emp-blvd18-r1c1',
    title: '#BLVD18 - Row 1 Col 1',
    project: '#BLVD18',
    category: '[#BLVD] #BLVD18',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-1.webp',
  },
  {
    id: 'emp-blvd18-r1c2',
    title: '#BLVD18 - Row 1 Col 2',
    project: '#BLVD18',
    category: '[#BLVD] #BLVD18',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-2.webp',
  },
  {
    id: 'emp-blvd18-r1c3',
    title: '#BLVD18 - Row 1 Col 3',
    project: '#BLVD18',
    category: '[#BLVD] #BLVD18',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-3.webp',
  },
  {
    id: 'emp-blvd18-r1c4',
    title: '#BLVD18 - Row 1 Col 4',
    project: '#BLVD18',
    category: '[#BLVD] #BLVD18',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-4.webp',
  },
  {
    id: 'emp-blvd18-r1c5',
    title: '#BLVD18 - Row 1 Col 5',
    project: '#BLVD18',
    category: '[#BLVD] #BLVD18',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-5.webp',
  },
  {
    id: 'emp-blvd18-r1c6',
    title: '#BLVD18 - Row 1 Col 6',
    project: '#BLVD18',
    category: '[#BLVD] #BLVD18',
    mode: 'employer-club',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD18/row-1-column-6.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [HVOC] BONDING (1 asset)
  // ==========================================
  {
    id: 'emp-hvoc-bonding',
    title: 'HVOC Bonding',
    project: 'HVOC Bonding',
    category: '[HVOC] BONDING',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20BONDING/%5BHVOC%5D%20BONDING.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [HVOC] Bưu điện HVOC (3 assets)
  // ==========================================
  {
    id: 'emp-hvoc-buudien-chinh',
    title: 'Bưu điện HVOC - Chính',
    project: 'Bưu điện HVOC',
    category: '[HVOC] Bưu điện HVOC',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20B%C6%B0u%20%C4%91i%E1%BB%87n%20HVOC/Ch%C3%ADnh.webp',
  },
  {
    id: 'emp-hvoc-buudien-quangba',
    title: 'Bưu điện HVOC - Quảng bá',
    project: 'Bưu điện HVOC',
    category: '[HVOC] Bưu điện HVOC',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20B%C6%B0u%20%C4%91i%E1%BB%87n%20HVOC/Qu%E1%BA%A3ng%20b%C3%A1.webp',
  },
  {
    id: 'emp-hvoc-buudien-biafb',
    title: 'Bưu điện HVOC - Ảnh bìa Facebook',
    project: 'Bưu điện HVOC',
    category: '[HVOC] Bưu điện HVOC',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20B%C6%B0u%20%C4%91i%E1%BB%87n%20HVOC/%E1%BA%A2nh%20b%C3%ACa%20Facebook.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [HVOC] HVOC Club Day (2 assets)
  // ==========================================
  {
    id: 'emp-hvoc-clubday-bien',
    title: 'HVOC Club Day - Khung ptb biển',
    project: 'HVOC Club Day',
    category: '[HVOC] HVOC Club Day',
    mode: 'employer-club',
    type: 'template',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20Club%20Day/Khung%20ptb%20bi%E1%BB%83n.webp',
  },
  {
    id: 'emp-hvoc-clubday-nui',
    title: 'HVOC Club Day - Khung ptb núi',
    project: 'HVOC Club Day',
    category: '[HVOC] HVOC Club Day',
    mode: 'employer-club',
    type: 'template',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20Club%20Day/Khung%20ptb%20n%C3%BAi.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [HVOC] HVOC DDO 7 (8 assets)
  // ==========================================
  {
    id: 'emp-hvoc-ddo7-daydeophu',
    title: 'HVOC DDO 7 - Dây đeo bản phụ',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/D%C3%A2y%20%C4%91eo%20b%E1%BA%A3n%20ph%E1%BB%A5.webp',
  },
  {
    id: 'emp-hvoc-ddo7-daydeochinh',
    title: 'HVOC DDO 7 - Dây đeo chính thức',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/D%C3%A2y%20%C4%91eo%20ch%C3%ADnh%20th%E1%BB%A9c.webp',
  },
  {
    id: 'emp-hvoc-ddo7-avatar',
    title: 'HVOC DDO 7 - Khung avatar',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'template',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/Khung%20avatar.webp',
  },
  {
    id: 'emp-hvoc-ddo7-poster',
    title: 'HVOC DDO 7 - Poster',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/Poster.webp',
  },
  {
    id: 'emp-hvoc-ddo7-tpl-chinh',
    title: 'HVOC DDO 7 - Template chính',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'template',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/Template%20ch%C3%ADnh.webp',
  },
  {
    id: 'emp-hvoc-ddo7-tpl-ketthuc',
    title: 'HVOC DDO 7 - Template kết thúc',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'template',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/Template%20k%E1%BA%BFt%20th%C3%BAc.webp',
  },
  {
    id: 'emp-hvoc-ddo7-tpl-modau',
    title: 'HVOC DDO 7 - Template mở đầu',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'template',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/Template%20m%E1%BB%9F%20%C4%91%E1%BA%A7u.webp',
  },
  {
    id: 'emp-hvoc-ddo7-thedeo',
    title: 'HVOC DDO 7 - Thẻ đeo',
    project: 'HVOC DDO 7',
    category: '[HVOC] HVOC DDO 7',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20DDO%207/Th%E1%BA%BB%20%C4%91eo.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [HVOC] HVOC TAR 8 (1 asset)
  // ==========================================
  {
    id: 'emp-hvoc-tar8-thedeo',
    title: 'HVOC TAR 8 - Thẻ đeo',
    project: 'HVOC TAR 8',
    category: '[HVOC] HVOC TAR 8',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20HVOC%20TAR%208/Th%E1%BA%BB%20%C4%91eo.webp',
  },

  // ==========================================
  // EMPLOYER / CLUB: [HVOC] Máu đông (1 asset)
  // ==========================================
  {
    id: 'emp-hvoc-maudong',
    title: 'HVOC - Máu đông',
    project: 'HVOC Máu đông',
    category: '[HVOC] Máu đông',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BHVOC%5D%20M%C3%A1u%20%C4%91%C3%B4ng/%5BHVOC%5D%20M%C3%A1u%20%C4%91%C3%B4ng.webp',
  },

  // =========================================================
  // EMPLOYER / CLUB: [REINMAGINED] Thẻ Học sinh CHV (22 assets)
  // =========================================================
  // --- Mặt sau (11) ---
  {
    id: 'emp-chv-sau-anh2',
    title: 'Thẻ CHV - Mặt sau Chuyên Anh (2)',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20Anh%20%282%29.webp',
  },
  {
    id: 'emp-chv-sau-anh3',
    title: 'Thẻ CHV - Mặt sau Chuyên Anh (3)',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20Anh%20%283%29.webp',
  },
  {
    id: 'emp-chv-sau-anh',
    title: 'Thẻ CHV - Mặt sau Chuyên Anh',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20Anh.webp',
  },
  {
    id: 'emp-chv-sau-hoa',
    title: 'Thẻ CHV - Mặt sau Chuyên Hóa',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20H%C3%B3a.webp',
  },
  {
    id: 'emp-chv-sau-li',
    title: 'Thẻ CHV - Mặt sau Chuyên Lí',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20L%C3%AD.webp',
  },
  {
    id: 'emp-chv-sau-sinh',
    title: 'Thẻ CHV - Mặt sau Chuyên Sinh',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20Sinh.webp',
  },
  {
    id: 'emp-chv-sau-su',
    title: 'Thẻ CHV - Mặt sau Chuyên Sử',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20S%E1%BB%AD.webp',
  },
  {
    id: 'emp-chv-sau-tin',
    title: 'Thẻ CHV - Mặt sau Chuyên Tin',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20Tin.webp',
  },
  {
    id: 'emp-chv-sau-toan',
    title: 'Thẻ CHV - Mặt sau Chuyên Toán',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20To%C3%A1n.webp',
  },
  {
    id: 'emp-chv-sau-van',
    title: 'Thẻ CHV - Mặt sau Chuyên Văn',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20V%C4%83n.webp',
  },
  {
    id: 'emp-chv-sau-dia',
    title: 'Thẻ CHV - Mặt sau Chuyên Địa',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20sau%20-%20Chuy%C3%AAn%20%C4%90%E1%BB%8Ba.webp',
  },
  // --- Mặt trước (11) ---
  {
    id: 'emp-chv-truoc-anh2',
    title: 'Thẻ CHV - Mặt trước Chuyên Anh (2)',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20Anh%20%282%29.webp',
  },
  {
    id: 'emp-chv-truoc-anh3',
    title: 'Thẻ CHV - Mặt trước Chuyên Anh (3)',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20Anh%20%283%29.webp',
  },
  {
    id: 'emp-chv-truoc-anh',
    title: 'Thẻ CHV - Mặt trước Chuyên Anh',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20Anh.webp',
  },
  {
    id: 'emp-chv-truoc-hoa',
    title: 'Thẻ CHV - Mặt trước Chuyên Hóa',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20H%C3%B3a.webp',
  },
  {
    id: 'emp-chv-truoc-li',
    title: 'Thẻ CHV - Mặt trước Chuyên Lí',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20L%C3%AD.webp',
  },
  {
    id: 'emp-chv-truoc-sinh',
    title: 'Thẻ CHV - Mặt trước Chuyên Sinh',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20Sinh.webp',
  },
  {
    id: 'emp-chv-truoc-su',
    title: 'Thẻ CHV - Mặt trước Chuyên Sử',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20S%E1%BB%AD.webp',
  },
  {
    id: 'emp-chv-truoc-tin',
    title: 'Thẻ CHV - Mặt trước Chuyên Tin',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20Tin.webp',
  },
  {
    id: 'emp-chv-truoc-toan',
    title: 'Thẻ CHV - Mặt trước Chuyên Toán',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20To%C3%A1n.webp',
  },
  {
    id: 'emp-chv-truoc-van',
    title: 'Thẻ CHV - Mặt trước Chuyên Văn',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20V%C4%83n.webp',
  },
  {
    id: 'emp-chv-truoc-dia',
    title: 'Thẻ CHV - Mặt trước Chuyên Địa',
    project: '[REINMAGINED] Thẻ Học sinh CHV',
    category: 'Thẻ Học sinh CHV',
    mode: 'employer-club',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5BREINMAGINED%5D%20Th%E1%BA%BB%20H%E1%BB%8Dc%20sinh%20CHV/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20-%20Chuy%C3%AAn%20%C4%90%E1%BB%8Ba.webp',
  },

  // =========================================================
  // EMPLOYER / CLUB: [Đội TNTN] Spotiflyer (20 assets)
  // =========================================================
  {
    id: 'emp-spotiflyer-bando-kv2',
    title: 'Spotiflyer - Bản đồ khu vực (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20khu%20v%E1%BB%B1c%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-bando-kv3',
    title: 'Spotiflyer - Bản đồ khu vực (3)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20khu%20v%E1%BB%B1c%20%283%29.webp',
  },
  {
    id: 'emp-spotiflyer-bando-kv4',
    title: 'Spotiflyer - Bản đồ khu vực (4)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20khu%20v%E1%BB%B1c%20%284%29.webp',
  },
  {
    id: 'emp-spotiflyer-bando-kv1',
    title: 'Spotiflyer - Bản đồ khu vực',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20khu%20v%E1%BB%B1c.webp',
  },
  {
    id: 'emp-spotiflyer-bando-tg2',
    title: 'Spotiflyer - Bản đồ thế giới (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20th%E1%BA%BF%20gi%E1%BB%9Bi%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-bando-tg3',
    title: 'Spotiflyer - Bản đồ thế giới (3)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20th%E1%BA%BF%20gi%E1%BB%9Bi%20%283%29.webp',
  },
  {
    id: 'emp-spotiflyer-bando-tg4',
    title: 'Spotiflyer - Bản đồ thế giới (4)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20th%E1%BA%BF%20gi%E1%BB%9Bi%20%284%29.webp',
  },
  {
    id: 'emp-spotiflyer-bando-tg1',
    title: 'Spotiflyer - Bản đồ thế giới',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/B%E1%BA%A3n%20%C4%91%E1%BB%93%20th%E1%BA%BF%20gi%E1%BB%9Bi.webp',
  },
  {
    id: 'emp-spotiflyer-cv1-2',
    title: 'Spotiflyer - Dãy BD công viên 1 (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/d%C3%A3y%20bd%20c%C3%B4ng%20vi%C3%AAn%201%20%28%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20T%C3%A2y%20-%20Nam%20-%20%C4%90%C3%B4ng%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20T%C3%A2y%20Nam%29%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-cv1-1',
    title: 'Spotiflyer - Dãy BD công viên 1',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/d%C3%A3y%20bd%20c%C3%B4ng%20vi%C3%AAn%201%20%28%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20T%C3%A2y%20-%20Nam%20-%20%C4%90%C3%B4ng%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20T%C3%A2y%20Nam%29.webp',
  },
  {
    id: 'emp-spotiflyer-cv2-2',
    title: 'Spotiflyer - Dãy BD công viên 2 (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/D%C3%A3y%20BD%20c%C3%B4ng%20vi%C3%AAn%202%20%28%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20-%20T%C3%A2y%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20-%20Nam%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20Nam%29%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-cv2-1',
    title: 'Spotiflyer - Dãy BD công viên 2',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/D%C3%A3y%20BD%20c%C3%B4ng%20vi%C3%AAn%202%20%28%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20-%20T%C3%A2y%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20-%20Nam%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20Nam%29.webp',
  },
  {
    id: 'emp-spotiflyer-luat-2',
    title: 'Spotiflyer - Luật chơi (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/Lu%E1%BA%ADt%20ch%C6%A1i%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-luat-3',
    title: 'Spotiflyer - Luật chơi (3)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/Lu%E1%BA%ADt%20ch%C6%A1i%20%283%29.webp',
  },
  {
    id: 'emp-spotiflyer-luat-4',
    title: 'Spotiflyer - Luật chơi (4)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/Lu%E1%BA%ADt%20ch%C6%A1i%20%284%29.webp',
  },
  {
    id: 'emp-spotiflyer-luat-1',
    title: 'Spotiflyer - Luật chơi',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/Lu%E1%BA%ADt%20ch%C6%A1i.webp',
  },
  {
    id: 'emp-spotiflyer-danang1-2',
    title: 'Spotiflyer - Nhà đa năng công viên 1 (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/nh%C3%A0%20%C4%91a%20n%C4%83ng%20c%C3%B4ng%20vi%C3%AAn%201%20%28T%C3%A2y%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20Nam%20-%20T%C3%A2y%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20T%C3%A2y%20Nam%29%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-danang1-1',
    title: 'Spotiflyer - Nhà đa năng công viên 1',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/nh%C3%A0%20%C4%91a%20n%C4%83ng%20c%C3%B4ng%20vi%C3%AAn%201%20%28T%C3%A2y%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20Nam%20-%20T%C3%A2y%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20T%C3%A2y%20Nam%29.webp',
  },
  {
    id: 'emp-spotiflyer-danang2-2',
    title: 'Spotiflyer - Nhà đa năng công viên 2 (2)',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/nh%C3%A0%20%C4%91a%20n%C4%83ng%20c%C3%B4ng%20vi%C3%AAn%202%20%28%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20-%20B%E1%BA%AFc%20-%20T%C3%A2y%20-%20Nam%20-%20%C4%90%C3%B4ng%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%29%20%282%29.webp',
  },
  {
    id: 'emp-spotiflyer-danang2-1',
    title: 'Spotiflyer - Nhà đa năng công viên 2',
    project: 'Spotiflyer',
    category: '[Đội TNTN] Spotiflyer',
    mode: 'employer-club',
    type: 'map',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%C4%90%E1%BB%99i%20TNTN%5D%20Spotiflyer/nh%C3%A0%20%C4%91a%20n%C4%83ng%20c%C3%B4ng%20vi%C3%AAn%202%20%28%C4%90%C3%B4ng%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%20-%20B%E1%BA%AFc%20-%20T%C3%A2y%20-%20Nam%20-%20%C4%90%C3%B4ng%20-%20B%E1%BA%AFc%20-%20%C4%90%C3%B4ng%29.webp',
  },

  // =========================================================
  // INDIVIDUAL: Bảo vệ môi trường (1 asset)
  // =========================================================
  {
    id: 'ind-bvmt',
    title: 'Bảo vệ môi trường',
    project: 'Bảo vệ môi trường',
    category: 'Bảo vệ môi trường',
    mode: 'individual',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/B%E1%BA%A3o%20v%E1%BB%87%20m%C3%B4i%20tr%C6%B0%E1%BB%9Dng/b%E1%BA%A3o%20v%E1%BB%87%20m%C3%B4i%20tr%C6%B0%E1%BB%9Dng.webp',
  },

  // =========================================================
  // INDIVIDUAL: Kỉ yếu (3 assets)
  // =========================================================
  {
    id: 'ind-kyeu-sau',
    title: 'Kỉ yếu - Mặt sau thẻ quà',
    project: 'Kỉ yếu',
    category: 'Kỉ yếu',
    mode: 'individual',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/K%E1%BB%89%20y%E1%BA%BFu/M%E1%BA%B7t%20sau%20th%E1%BA%BB%20qua.webp',
  },
  {
    id: 'ind-kyeu-truoc',
    title: 'Kỉ yếu - Mặt trước thẻ quà',
    project: 'Kỉ yếu',
    category: 'Kỉ yếu',
    mode: 'individual',
    type: 'badge',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/K%E1%BB%89%20y%E1%BA%BFu/M%E1%BA%B7t%20tr%C6%B0%E1%BB%9Bc%20th%E1%BA%BB%20qu%C3%A0.webp',
  },
  {
    id: 'ind-kyeu-thumoi',
    title: 'Kỉ yếu - Thư mời',
    project: 'Kỉ yếu',
    category: 'Kỉ yếu',
    mode: 'individual',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/K%E1%BB%89%20y%E1%BA%BFu/Th%C6%B0%20m%E1%BB%9Di.webp',
  },

  // =========================================================
  // INDIVIDUAL: Museum of Fine Arts (6 assets)
  // =========================================================
  {
    id: 'ind-mfa-1',
    title: 'Museum of Fine Arts - 01',
    project: 'Museum of Fine Arts',
    category: 'Museum of Fine Arts',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Museum%20of%20Fine%20Arts/1.webp',
  },
  {
    id: 'ind-mfa-2',
    title: 'Museum of Fine Arts - 02',
    project: 'Museum of Fine Arts',
    category: 'Museum of Fine Arts',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Museum%20of%20Fine%20Arts/2.webp',
  },
  {
    id: 'ind-mfa-3',
    title: 'Museum of Fine Arts - 03',
    project: 'Museum of Fine Arts',
    category: 'Museum of Fine Arts',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Museum%20of%20Fine%20Arts/3.webp',
  },
  {
    id: 'ind-mfa-4',
    title: 'Museum of Fine Arts - 04',
    project: 'Museum of Fine Arts',
    category: 'Museum of Fine Arts',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Museum%20of%20Fine%20Arts/4.webp',
  },
  {
    id: 'ind-mfa-5',
    title: 'Museum of Fine Arts - 05',
    project: 'Museum of Fine Arts',
    category: 'Museum of Fine Arts',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Museum%20of%20Fine%20Arts/5.webp',
  },
  {
    id: 'ind-mfa-6',
    title: 'Museum of Fine Arts - 06',
    project: 'Museum of Fine Arts',
    category: 'Museum of Fine Arts',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Employer/%5B%23BLVD%5D%20%23BLVD16/1.webp',
  },

  // =========================================================================
  // INDIVIDUAL: Thuan Phat, Boulevard et ville de Da Lat / #BLVD16 (8 assets)
  // =========================================================================
  {
    id: 'ind-dalat-blvd16-1',
    title: 'Đà Lạt - #BLVD16 - 01',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/1.webp',
  },
  {
    id: 'ind-dalat-blvd16-2',
    title: 'Đà Lạt - #BLVD16 - 02',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/2.webp',
  },
  {
    id: 'ind-dalat-blvd16-3',
    title: 'Đà Lạt - #BLVD16 - 03',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/3.webp',
  },
  {
    id: 'ind-dalat-blvd16-4',
    title: 'Đà Lạt - #BLVD16 - 04',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/4.webp',
  },
  {
    id: 'ind-dalat-blvd16-5',
    title: 'Đà Lạt - #BLVD16 - 05',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/5.webp',
  },
  {
    id: 'ind-dalat-blvd16-6',
    title: 'Đà Lạt - #BLVD16 - 06',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/6.webp',
  },
  {
    id: 'ind-dalat-blvd16-7',
    title: 'Đà Lạt - #BLVD16 - 07',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/7.webp',
  },
  {
    id: 'ind-dalat-blvd16-8',
    title: 'Đà Lạt - #BLVD16 - 08',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD16',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD16/8.webp',
  },

  // =========================================================================
  // INDIVIDUAL: Thuan Phat, Boulevard et ville de Da Lat / #BLVD17 (5 assets)
  // =========================================================================
  {
    id: 'ind-dalat-blvd17-1',
    title: 'Đà Lạt - #BLVD17 - 01',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD17',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD17/1.webp',
  },
  {
    id: 'ind-dalat-blvd17-2',
    title: 'Đà Lạt - #BLVD17 - 02',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD17',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD17/2.webp',
  },
  {
    id: 'ind-dalat-blvd17-3',
    title: 'Đà Lạt - #BLVD17 - 03',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD17',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD17/3.webp',
  },
  {
    id: 'ind-dalat-blvd17-4',
    title: 'Đà Lạt - #BLVD17 - 04',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD17',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD17/4.webp',
  },
  {
    id: 'ind-dalat-blvd17-5',
    title: 'Đà Lạt - #BLVD17 - 05',
    project: 'Thuan Phat, Boulevard et ville de Da Lat',
    category: 'Thuan Phat, Boulevard et ville de Da Lat / #BLVD17',
    mode: 'individual',
    type: 'graphic',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/Thuan%20Phat%2C%20Boulevard%20et%20ville%20de%20Da%20Lat/%23BLVD17/5.webp',
  },

  // =========================================================
  // INDIVIDUAL: [A2K28] 20_10_2025 (1 asset)
  // =========================================================
  {
    id: 'ind-a2k28',
    title: '[A2K28] 20_10_2025',
    project: '[A2K28] 20_10_2025',
    category: '[A2K28] 20_10_2025',
    mode: 'individual',
    type: 'poster',
    url: 'https://raw.githubusercontent.com/boulevardphat/Kho-multimedia-c-a-Blvd/main/blvdarchive/Boulevard1st/Individual/%5BA2K28%5D%2020_10_2025/%5BA2K28%5D%2020_10_2025.webp',
  },
];

/**
 * Trợ giúp truy vấn tài nguyên theo chế độ Portfolio (Employer/Club vs Individual)
 */
export const getAssetsByMode = (mode: PortfolioMode): ArchiveAsset[] => {
  return BLVD_ARCHIVE_ASSETS.filter((item) => item.mode === mode);
};

/**
 * Trợ giúp truy vấn tài nguyên theo tên dự án
 */
export const getAssetsByProject = (projectName: string): ArchiveAsset[] => {
  return BLVD_ARCHIVE_ASSETS.filter(
    (item) => item.project.toLowerCase() === projectName.toLowerCase()
  );
};

/**
 * Trợ giúp nhóm tài nguyên theo Dự án (Project Groups)
 */
export const getProjectGroups = (mode?: PortfolioMode): ProjectGroup[] => {
  const filtered = mode ? getAssetsByMode(mode) : BLVD_ARCHIVE_ASSETS;
  const groupMap = new Map<string, ProjectGroup>();

  filtered.forEach((asset) => {
    if (!groupMap.has(asset.project)) {
      groupMap.set(asset.project, {
        id: asset.project.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: asset.project,
        mode: asset.mode,
        category: asset.category,
        assets: [],
      });
    }
    groupMap.get(asset.project)!.assets.push(asset);
  });

  return Array.from(groupMap.values());
};
