package com.mavnav;

import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments; // Import Arguments
import com.facebook.react.bridge.WritableMap; // Import WritableMap


public class DataStoreModule extends ReactContextBaseJavaModule {

    private final DataStore dataStore;

    public DataStoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
        Context context = reactContext.getApplicationContext();
        this.dataStore = new DataStore(context); // Initialize DataStore with context
    }

    @NonNull
    @Override
    public String getName() {
        return "DataStore"; // Name of the module to be used in JavaScript
    }

    // Save Student Information
    @ReactMethod
    public void saveStudent(int studentId, String firstName, String lastName, String email, String major) {
        dataStore.saveStudentInfo(studentId, firstName, lastName, email, major);
    }

    // Retrieve Student Information
    @ReactMethod
    public void getStudent(Promise promise) {
        try {
            DataProvider.Student student = dataStore.getStudentInfo();
            WritableMap studentMap = Arguments.createMap(); // Create a WritableMap
            studentMap.putInt("studentId", student.getStudentId());
            studentMap.putString("firstName", student.getFirstName());
            studentMap.putString("lastName", student.getLastName());
            studentMap.putString("email", student.getEmail());
            studentMap.putString("major", student.getMajor());
            promise.resolve(studentMap); // Resolve with the map
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }


    // Save Class Information
    @ReactMethod
    public void saveClass(int classId, String className, String professor, String capacity, String location) {
        Integer cap = capacity.equals("Unknown") ? null : Integer.parseInt(capacity);
        dataStore.saveClassInfo(classId, className, professor, cap, location);
    }

    // Retrieve Class Information
    @ReactMethod
    public void getClass(Promise promise) {
        try {
            DataProvider.ClassInfo classInfo = dataStore.getClassInfo();
            WritableMap classMap = Arguments.createMap();
            classMap.putInt("classId", classInfo.getClassId());
            classMap.putString("className", classInfo.getClassName());
            classMap.putString("professor", classInfo.getProfessor());
            classMap.putString("capacity", classInfo.getCapacity() != null ? classInfo.getCapacity().toString() : "Unknown");
            classMap.putString("location", classInfo.getLocation());
            promise.resolve(classMap);
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }


    // Save Event Information
    @ReactMethod
    public void saveEvent(String name, String location, String dateAndTime, String description) {
        dataStore.saveEventInfo(name, location, dateAndTime, description);
    }

    // Retrieve Event Information
    @ReactMethod
    public void getEvent(Promise promise) {
        try {
            DataProvider.Event event = dataStore.getEventInfo();
            WritableMap eventMap = Arguments.createMap();
            eventMap.putString("name", event.getName());
            eventMap.putString("location", event.getLocation());
            eventMap.putString("dateAndTime", event.getDateAndTime());
            eventMap.putString("description", event.getDescription());
            promise.resolve(eventMap);
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }


    // Clear All Data
    @ReactMethod
    public void clearAllData() {
        dataStore.clearAllData();
    }
}
