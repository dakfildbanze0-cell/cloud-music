package com.cloudmusic.app.plugin

import android.content.Context
import android.provider.MediaStore
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission

@CapacitorPlugin(
    name = "AudioScanner",
    permissions = [
        Permission(
            alias = "audio",
            strings = [
                android.Manifest.permission.READ_MEDIA_AUDIO,
                android.Manifest.permission.READ_EXTERNAL_STORAGE
            ]
        )
    ]
)
class AudioScannerPlugin : Plugin() {

    @PluginMethod
    fun scan(call: PluginCall) {
        val audioList = JSArray()
        val context: Context = bridge.activity.applicationContext

        val uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI

        val projection = arrayOf(
            MediaStore.Audio.Media.DISPLAY_NAME,
            MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.ALBUM,
            MediaStore.Audio.Media.DURATION,
            MediaStore.Audio.Media.SIZE,
            MediaStore.Audio.Media.DATA
        )

        val cursor = context.contentResolver.query(uri, projection, null, null, null)

        cursor?.use {
            val nameIndex = it.getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME)
            val artistIndex = it.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST)
            val albumIndex = it.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM)
            val durationIndex = it.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION)
            val sizeIndex = it.getColumnIndexOrThrow(MediaStore.Audio.Media.SIZE)
            val dataIndex = it.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA)

            while (it.moveToNext()) {
                val obj = JSObject()

                obj.put("name", it.getString(nameIndex) ?: "Unknown")
                obj.put("artist", it.getString(artistIndex) ?: "Unknown Artist")
                obj.put("album", it.getString(albumIndex) ?: "Unknown Album")
                obj.put("duration", it.getLong(durationIndex))
                obj.put("size", it.getLong(sizeIndex))
                obj.put("path", it.getString(dataIndex) ?: "")

                audioList.put(obj)
            }
        }

        val ret = JSObject()
        ret.put("songs", audioList)

        call.resolve(ret)
    }

    @PluginMethod
    fun scanAudioFiles(call: PluginCall) {
        scan(call)
    }
}
