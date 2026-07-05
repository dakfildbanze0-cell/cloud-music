package com.cloudmusic.app.plugin;

import android.Manifest;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "AudioScanner",
    permissions = {
        @Permission(
            alias = "audio",
            strings = {
                Manifest.permission.READ_MEDIA_AUDIO,
                Manifest.permission.READ_EXTERNAL_STORAGE
            }
        )
    }
)
public class AudioScannerPlugin extends Plugin {

    @PluginMethod
    public void scanAudioFiles(PluginCall call) {
        if (getPermissionState("audio") != com.getcapacitor.PermissionState.GRANTED) {
            requestPermissionForAlias("audio", call, "audioPermsCallback");
        } else {
            loadAudioFiles(call);
        }
    }

    @PermissionCallback
    private void audioPermsCallback(PluginCall call) {
        if (getPermissionState("audio") == com.getcapacitor.PermissionState.GRANTED) {
            loadAudioFiles(call);
        } else {
            call.reject("Permission is required to read audio files");
        }
    }

    private void loadAudioFiles(PluginCall call) {
        JSArray filesArray = new JSArray();
        ContentResolver contentResolver = getContext().getContentResolver();
        
        Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String[] projection = {
            MediaStore.Audio.Media._ID,
            MediaStore.Audio.Media.TITLE,
            MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.ALBUM,
            MediaStore.Audio.Media.DURATION,
            MediaStore.Audio.Media.SIZE,
            MediaStore.Audio.Media.DATE_MODIFIED,
            MediaStore.Audio.Media.DATA
        };

        String selection = MediaStore.Audio.Media.IS_MUSIC + " != 0";
        String sortOrder = MediaStore.Audio.Media.TITLE + " ASC";

        try (Cursor cursor = contentResolver.query(uri, projection, selection, null, sortOrder)) {
            if (cursor != null && cursor.moveToFirst()) {
                do {
                    long id = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
                    String title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
                    String artist = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST));
                    String album = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM));
                    long duration = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION));
                    long size = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.SIZE));
                    long dateModified = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATE_MODIFIED));
                    String dataPath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));

                    // Filter only supported formats requested
                    if (dataPath != null && (
                            dataPath.endsWith(".mp3") ||
                            dataPath.endsWith(".m4a") ||
                            dataPath.endsWith(".aac") ||
                            dataPath.endsWith(".flac") ||
                            dataPath.endsWith(".wav") ||
                            dataPath.endsWith(".ogg")
                        )) {

                        JSObject fileObj = new JSObject();
                        fileObj.put("id", String.valueOf(id));
                        fileObj.put("title", title != null ? title : "Unknown Title");
                        fileObj.put("artist", artist != null ? artist : "Unknown Artist");
                        fileObj.put("album", album != null ? album : "Unknown Album");
                        fileObj.put("duration", duration);
                        fileObj.put("size", size);
                        fileObj.put("dateModified", dateModified);
                        fileObj.put("uri", dataPath); // Native path, will need conversion to Web URL if played in webview
                        
                        // We also provide a web-friendly URL using Capacitor's convertFileSrc
                        fileObj.put("webPath", getBridge().getLocalUrl(dataPath));

                        filesArray.put(fileObj);
                    }
                } while (cursor.moveToNext());
            }
        } catch (Exception e) {
            call.reject("Failed to scan audio files", e);
            return;
        }

        JSObject result = new JSObject();
        result.put("files", filesArray);
        call.resolve(result);
    }

    @PluginMethod
    public void readFileAsBase64(PluginCall call) {
        String uriStr = call.getString("uri");
        if (uriStr == null) {
            call.reject("Must provide uri");
            return;
        }
        
        try {
            Uri uri = Uri.parse("file://" + uriStr);
            java.io.InputStream is = getContext().getContentResolver().openInputStream(uri);
            if (is == null) {
                call.reject("Could not open input stream");
                return;
            }
            java.io.ByteArrayOutputStream buffer = new java.io.ByteArrayOutputStream();
            int nRead;
            byte[] data = new byte[16384];
            while ((nRead = is.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            buffer.flush();
            byte[] audioBytes = buffer.toByteArray();
            String base64 = android.util.Base64.encodeToString(audioBytes, android.util.Base64.NO_WRAP);
            
            JSObject ret = new JSObject();
            ret.put("data", base64);
            call.resolve(ret);
        } catch(Exception e) {
            call.reject("Error reading file", e);
        }
    }
}
