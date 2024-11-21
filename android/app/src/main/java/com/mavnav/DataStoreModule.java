package com.mavnav;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.List;

public class DataStoreModule extends ReactContextBaseJavaModule {

    private final DataStore dataStore;

    public DataStoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.dataStore = DataStore.getInstance();
    }

    @Override
    public String getName() {
        return "DataStore";
    }

    @ReactMethod
    public void getStudent(Promise promise) {
        try {
            DataStore.Student student = dataStore.getStudent(); // Fetch student from DataStore
            WritableMap studentMap = Arguments.createMap();
            studentMap.putString("studentId", student.getStudentId());
            studentMap.putString("firstName", student.getFirstName());
            studentMap.putString("lastName", student.getLastName());
            studentMap.putString("email", student.getEmail());
            studentMap.putString("major", student.getMajor());
            promise.resolve(studentMap);
        } catch (Exception e) {
            promise.reject("GET_STUDENT_ERROR", "Failed to get student information.", e);
        }
    }

    @ReactMethod
    public void getClasses(Promise promise) {
        try {
            List<DataStore.ClassInfo> classes = dataStore.getClasses(); // Fetch classes from DataStore
            WritableArray classArray = Arguments.createArray();
            for (DataStore.ClassInfo classInfo : classes) {
                WritableMap classMap = Arguments.createMap();
                classMap.putString("classId", classInfo.getClassId());
                classMap.putString("className", classInfo.getClassName());
                classMap.putString("professor", classInfo.getProfessor());
                classMap.putString("capacity", classInfo.getCapacity());
                classMap.putString("location", classInfo.getLocation());
                classArray.pushMap(classMap);
            }
            promise.resolve(classArray);
        } catch (Exception e) {
            promise.reject("GET_CLASSES_ERROR", "Failed to get classes.", e);
        }
    }

    @ReactMethod
    public void getEvents(Promise promise) {
        try {
            List<DataStore.Event> events = dataStore.getEvents(); // Fetch events from DataStore
            WritableArray eventArray = Arguments.createArray();
            for (DataStore.Event event : events) {
                WritableMap eventMap = Arguments.createMap();
                eventMap.putString("name", event.getName());
                eventMap.putString("location", event.getLocation());
                eventMap.putString("dateAndTime", event.getDateAndTime());
                eventMap.putString("description", event.getDescription());
                eventArray.pushMap(eventMap);
            }
            promise.resolve(eventArray);
        } catch (Exception e) {
            promise.reject("GET_EVENTS_ERROR", "Failed to get events.", e);
        }
    }

    @ReactMethod
    public void addClass(String classId, String className, String professor, String capacity, String location, Promise promise) {
        try {
            dataStore.addClass(classId, className, professor, capacity, location);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ADD_CLASS_ERROR", "Failed to add class.", e);
        }
    }

    @ReactMethod
    public void addEvent(String name, String location, String dateAndTime, String description, Promise promise) {
        try {
            dataStore.addEvent(name, location, dateAndTime, description);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ADD_EVENT_ERROR", "Failed to add event.", e);
        }
    }

    @ReactMethod
    public void removeClass(String classId, Promise promise) {
        try {
            dataStore.removeClass(classId);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("REMOVE_CLASS_ERROR", "Failed to remove class.", e);
        }
    }

    @ReactMethod
    public void removeEvent(String name, Promise promise) {
        try {
            dataStore.removeEvent(name);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("REMOVE_EVENT_ERROR", "Failed to remove event.", e);
        }
    }
}
