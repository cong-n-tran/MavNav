package com.mavnav;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * A ReactPackage implementation to expose the DataStoreModule to React Native.
 */
public class DataStorePackage implements ReactPackage {

    /**
     * Creates a list of native modules to register with React Native.
     *
     * @param reactContext The React application context.
     * @return A list of native modules to expose to JavaScript.
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        // Register the DataStoreModule
        modules.add(new DataStoreModule(reactContext));
        return modules;
    }

    /**
     * Creates a list of view managers to register with React Native.
     * This implementation does not provide custom view managers.
     *
     * @param reactContext The React application context.
     * @return An empty list as no custom view managers are provided.
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
