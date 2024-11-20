package com.mavnav;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

public class DataStoreModule extends ReactContextBaseJavaModule {

    private final DataStore dataStore;

    public DataStoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.dataStore = DataStore.getInstance(); // Singleton instance of DataStore
    }

    @Override
    public String getName() {
        return "DataStore"; // Exposed module name
    }

    // Fetch all classes
    @ReactMethod
    public void getClasses(Promise promise) {
        try {
            List<DataProvider.ClassInfo> classes = dataStore.getClasses(); // Fetch classes from DataStore
            WritableArray classArray = Arguments.createArray();

            for (DataProvider.ClassInfo classInfo : classes) {
                WritableMap classMap = Arguments.createMap();
                classMap.putInt("classId", classInfo.getClassId());
                classMap.putString("className", classInfo.getClassName());
                classMap.putString("professor", classInfo.getProfessor());
                classMap.putString("capacity", classInfo.getCapacity() != null ? classInfo.getCapacity().toString() : "Unknown");
                classMap.putString("location", classInfo.getLocation());
                classArray.pushMap(classMap);
            }

            promise.resolve(classArray);
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    // Fetch all events
    @ReactMethod
    public void getEvents(Promise promise) {
        try {
            List<DataProvider.Event> events = dataStore.getEvents(); // Fetch events from DataStore
            WritableArray eventArray = Arguments.createArray();

            for (DataProvider.Event event : events) {
                WritableMap eventMap = Arguments.createMap();
                eventMap.putString("name", event.getName());
                eventMap.putString("location", event.getLocation());
                eventMap.putString("dateAndTime", event.getDateAndTime());
                eventMap.putString("description", event.getDescription());
                eventArray.pushMap(eventMap);
            }

            promise.resolve(eventArray);
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    // Fetch student information
    @ReactMethod
    public void getStudent(Promise promise) {
        try {
            DataProvider.Student student = dataStore.getStudentInfo(); // Fetch student from DataStore
            WritableMap studentMap = Arguments.createMap();
            studentMap.putInt("studentId", student.getStudentId());
            studentMap.putString("firstName", student.getFirstName());
            studentMap.putString("lastName", student.getLastName());
            studentMap.putString("email", student.getEmail());
            studentMap.putString("major", student.getMajor());
            promise.resolve(studentMap);
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    // Add a new class
    @ReactMethod
    public void addClass(int classId, String className, String professor, String capacity, String location, Promise promise) {
        try {
            Integer cap = capacity.equals("Unknown") ? null : Integer.parseInt(capacity);
            dataStore.addClass(new DataProvider.ClassInfo(classId, className, professor, cap, location));
            promise.resolve("Class added successfully");
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    // Add a new event
    @ReactMethod
    public void addEvent(String name, String location, String dateAndTime, String description, Promise promise) {
        try {
            dataStore.addEvent(new DataProvider.Event(name, location, dateAndTime, description));
            promise.resolve("Event added successfully");
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    // Remove a class by ID
    @ReactMethod
    public void removeClass(int classId, Promise promise) {
        try {
            boolean removed = dataStore.removeClass(classId);
            if (removed) {
                promise.resolve("Class removed successfully");
            } else {
                promise.reject("Error", "Class not found");
            }
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    // Remove an event by name
    @ReactMethod
    public void removeEvent(String eventName, Promise promise) {
        try {
            boolean removed = dataStore.removeEvent(eventName);
            if (removed) {
                promise.resolve("Event removed successfully");
            } else {
                promise.reject("Error", "Event not found");
            }
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }
}
