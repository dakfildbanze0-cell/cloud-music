package com.cloudmusic.app.plugin;

import android.os.Environment;
import android.os.StatFs;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "DeviceStorage")
public class DeviceStoragePlugin extends Plugin {

    @PluginMethod
    public void getStorageInfo(PluginCall call) {
        try {
            StatFs stat = new StatFs(Environment.getExternalStorageDirectory().getPath());
            long bytesAvailable = stat.getBlockSizeLong() * stat.getAvailableBlocksLong();
            long bytesTotal = stat.getBlockSizeLong() * stat.getBlockCountLong();
            long bytesUsed = bytesTotal - bytesAvailable;

            JSObject ret = new JSObject();
            ret.put("total", bytesTotal);
            ret.put("used", bytesUsed);
            ret.put("free", bytesAvailable);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Could not get device storage", e);
        }
    }
}
