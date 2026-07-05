import { registerPlugin } from '@capacitor/core';

export interface LocalAudioFile {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  size: number;
  dateModified: number;
  uri: string;
  webPath?: string;
}

export interface AudioScannerPlugin {
  scanAudioFiles(): Promise<{ files: LocalAudioFile[] }>;
  readFileAsBase64(options: { uri: string }): Promise<{ data: string }>;
}

export const AudioScanner = registerPlugin<AudioScannerPlugin>('AudioScanner');
