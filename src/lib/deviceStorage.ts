import { registerPlugin } from '@capacitor/core';

export interface DeviceStorageInfo {
  total: number;
  used: number;
  free: number;
}

export interface DeviceStoragePlugin {
  getStorage(): Promise<DeviceStorageInfo>;
  getStorageInfo(): Promise<DeviceStorageInfo>;
}

export const DeviceStorage = registerPlugin<DeviceStoragePlugin>('DeviceStorage');

export async function getStorage() {
  return await DeviceStorage.getStorage();
}
