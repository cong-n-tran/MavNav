package com.mavnav;

import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

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
            promise.resolve(Arguments.createMap()
                    .putInt("studentId", student.getStudentId())
                    .putString("firstName", student.getFirstName())
                    .putString("lastName", student.getLastName())
                    .putString("email", student.getEmail())
                    .putString("major", student.getMajor()));
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
            promise.resolve(Arguments.createMap()
                    .putInt("classId", classInfo.getClassId())
                    .putString("className", classInfo.getClassName())
                    .putString("professor", classInfo.getProfessor())
                    .putString("capacity", classInfo.getCapacity() != null ? classInfo.getCapacity().toString() : "Unknown")
                    .putString("location", classInfo.getLocation()));
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
            promise.resolve(Arguments.createMap()
                    .putString("name", event.getName())
                    .putString("location", event.getLocation())
                    .putString("dateAndTime", event.getDateAndTime())
                    .putString("description", event.getDescription()));
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
