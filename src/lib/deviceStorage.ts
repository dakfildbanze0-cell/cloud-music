import { registerPlugin } from '@capacitor/core';

export interface DeviceStoragePlugin {
  getStorageInfo(): Promise<{ total: number; used: number; free: number }>;
}

export const DeviceStorage = registerPlugin<DeviceStoragePlugin>('DeviceStorage');
