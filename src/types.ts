export type PortfolioMode = 'individual' | 'employer-club';
export type AppLanguage = 'vi' | 'en';

export type SceneState = 
  | 'pre-intro' 
  | 'intro-play' 
  | 'intro-blvd' 
  | 'intro-clock-normal' 
  | 'intro-clock-reverse-mirrored' 
  | 'intro-clock-multiple' 
  | 'intro-image-1' 
  | 'intro-image-2' 
  | 'intro-image-3' 
  | 'main-app'
  | 'blvd-play'
  | 'blvd-text'
  | 'blvd-clock-normal'
  | 'blvd-clock-reverse-mirrored'
  | 'blvd-title-1'
  | 'blvd-title-2'
  | 'blvd-color-1'
  | 'blvd-color-2'
  | 'blvd-color-3'
  | 'blvd-black';
