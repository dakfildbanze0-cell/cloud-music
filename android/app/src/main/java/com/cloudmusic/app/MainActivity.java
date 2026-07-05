package com.cloudmusic.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.cloudmusic.app.plugin.AudioScannerPlugin;
import com.cloudmusic.app.plugin.DeviceStoragePlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(AudioScannerPlugin.class);
        registerPlugin(DeviceStoragePlugin.class);
    }
}
