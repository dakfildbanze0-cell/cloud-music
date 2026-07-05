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

export interface AudioScannerSong {
  name: string;
  artist: string;
  album: string;
  duration: number;
  size: number;
  path: string;
}

export interface AudioScannerPlugin {
  scan(): Promise<{ songs: AudioScannerSong[] }>;
  scanAudioFiles(): Promise<{ files: LocalAudioFile[] }>;
  readFileAsBase64(options: { uri: string }): Promise<{ data: string }>;
}

export const AudioScanner = registerPlugin<AudioScannerPlugin>('AudioScanner');

export async function getSongs() {
  const result = await AudioScanner.scan();
  return result.songs;
}
