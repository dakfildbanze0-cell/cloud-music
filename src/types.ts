export type ScreenName =
  | 'splash'
  | 'login'
  | 'register'
  | 'home'
  | 'library'
  | 'import'
  | 'upload'
  | 'player'
  | 'search'
  | 'playlists'
  | 'playlist-detail'
  | 'downloads'
  | 'favorites'
  | 'artists'
  | 'artist-detail'
  | 'albums'
  | 'album-detail'
  | 'settings'
  | 'profile'
  | 'offline'
  | 'sync';

export type MainTab = 'home' | 'library' | 'search' | 'downloads' | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  registeredAt: string;
  plan: string;
  storageUsedGB: number;
  storageTotalGB: number;
}

export type AudioFormat = 'MP3' | 'FLAC' | 'AAC' | 'M4A' | 'WAV' | 'OGG';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  durationFormatted: string; // e.g. "3:20"
  coverUrl: string;
  audioUrl?: string;
  format: AudioFormat;
  genre: string;
  isFavorite: boolean;
  isDownloaded: boolean;
  isUploaded: boolean;
  fileSizeBytes: number;
  fileSizeFormatted: string; // e.g. "7.8 MB"
  year: number;
  folderPath?: string;
  synthKey?: string; // for web audio synth if audioUrl is not custom
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  isPrivate: boolean;
  songIds: string[];
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  songCount: number;
  albumCount: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  songCount: number;
}

export interface DownloadItem {
  id: string;
  songId: string;
  progress: number; // 0 to 100
  status: 'completed' | 'downloading' | 'queued' | 'error';
  speedMbps: number;
}

export interface SyncStatus {
  lastSyncFormatted: string;
  uploadedCount: number;
  downloadedCount: number;
  totalFiles: number;
  isSyncing: boolean;
  speedMBs: number;
  timeRemaining: string;
  errors: string[];
}

export interface UserSettings {
  theme: 'escuro' | 'sistema' | 'claro';
  language: string;
  audioQuality: 'Extrema (320kbps)' | 'Alta (256kbps)' | 'Normal (128kbps)';
  autoDownload: boolean;
  autoBackup: boolean;
  wifiOnlySync: boolean;
  cacheSizeMB: number;
}

export interface DeviceStorageInfo {
  totalGB: number;
  usedGB: number;
  freeGB: number;
  audioMB: number;
  imagesMB: number;
  videosGB: number;
  docsMB: number;
  appsGB: number;
  downloadsMB: number;
  isRealEstimate: boolean;
}
