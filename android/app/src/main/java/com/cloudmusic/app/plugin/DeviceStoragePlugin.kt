package com.cloudmusic.app.plugin

import android.os.StatFs
import android.os.Environment
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "DeviceStorage")
class DeviceStoragePlugin : Plugin() {

    @PluginMethod
    fun getStorage(call: PluginCall) {
        try {
            val path = Environment.getDataDirectory()
            val stat = StatFs(path.path)

            val total = stat.blockSizeLong * stat.blockCountLong
            val free = stat.blockSizeLong * stat.availableBlocksLong
            val used = total - free

            val ret = JSObject()

            ret.put("total", total)
            ret.put("free", free)
            ret.put("used", used)

            call.resolve(ret)
        } catch (e: Exception) {
            call.reject("Could not get device storage", e)
        }
    }

    @PluginMethod
    fun getStorageInfo(call: PluginCall) {
        getStorage(call)
    }
}
