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
            DataStore.Student student = dataStore.getStudent();
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
            List<DataStore.ClassInfo> classes = dataStore.getClasses();
            WritableArray classArray = Arguments.createArray();
            for (DataStore.ClassInfo classInfo : classes) {
                WritableMap classMap = Arguments.createMap();
                classMap.putString("classId", classInfo.getClassId());
                classMap.putString("className", classInfo.getClassName());
                classMap.putString("professor", classInfo.getProfessor());
                classMap.putString("location", classInfo.getLocation());
                classArray.pushMap(classMap);
            }
            promise.resolve(classArray);
        } catch (Exception e) {
            promise.reject("GET_CLASSES_ERROR", "Failed to get classes.", e);
        }
    }

    @ReactMethod
    public void addClass(String classId, String className, String professor, String location, Promise promise) {
        try {
            dataStore.addClass(classId, className, professor, location);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ADD_CLASS_ERROR", "Failed to add class.", e);
        }
    }

    @ReactMethod
    public void editClass(String classId, String className, String professor, String location, Promise promise) {
        try {
            dataStore.editClass(classId, className, professor, location);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("EDIT_CLASS_ERROR", "Failed to edit class.", e);
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
    public void getEvents(Promise promise) {
        try {
            List<DataStore.Event> events = dataStore.getEvents();
            WritableArray eventArray = Arguments.createArray();
            for (DataStore.Event event : events) {
                WritableMap eventMap = Arguments.createMap();
                eventMap.putString("eventId", event.getEventId());
                eventMap.putString("name", event.getName());
                eventMap.putString("location", event.getLocation());
                eventMap.putString("dateAndTime", event.getDateAndTime());
                eventMap.putString("description", event.getDescription());
                WritableArray tagArray = Arguments.createArray();
                for (String tag : event.getTags()) {
                    tagArray.pushString(tag);
                }
                eventMap.putArray("tags", tagArray);
                eventArray.pushMap(eventMap);
            }
            promise.resolve(eventArray);
        } catch (Exception e) {
            promise.reject("GET_EVENTS_ERROR", "Failed to get events.", e);
        }
    }

    @ReactMethod
    public void addEvent(String name, String location, String dateAndTime, String description, Promise promise) {
        try {
            dataStore.addEvent(name, location, dateAndTime, description, List.of());
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ADD_EVENT_ERROR", "Failed to add event.", e);
        }
    }

    @ReactMethod
    public void editEvent(String eventId, String name, String location, String dateAndTime, String description, Promise promise) {
        try {
            dataStore.editEvent(eventId, name, location, dateAndTime, description, List.of());
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("EDIT_EVENT_ERROR", "Failed to edit event.", e);
        }
    }

    @ReactMethod
    public void removeEvent(String eventId, Promise promise) {
        try {
            dataStore.removeEvent(eventId);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("REMOVE_EVENT_ERROR", "Failed to remove event.", e);
        }
    }

    @ReactMethod
    public void toggleFavorite(String eventId, Promise promise) {
        try {
            dataStore.toggleFavorite(eventId);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("TOGGLE_FAVORITE_ERROR", "Failed to toggle favorite.", e);
        }
    }

    @ReactMethod
    public void getEventsByTag(String tag, Promise promise) {
        try {
            List<DataStore.Event> events = dataStore.getEventsByTag(tag);
            WritableArray eventArray = Arguments.createArray();
            for (DataStore.Event event : events) {
                WritableMap eventMap = Arguments.createMap();
                eventMap.putString("eventId", event.getEventId());
                eventMap.putString("name", event.getName());
                eventMap.putString("location", event.getLocation());
                eventMap.putString("dateAndTime", event.getDateAndTime());
                eventMap.putString("description", event.getDescription());
                WritableArray tagArray = Arguments.createArray();
                for (String t : event.getTags()) {
                    tagArray.pushString(t);
                }
                eventMap.putArray("tags", tagArray);
                eventArray.pushMap(eventMap);
            }
            promise.resolve(eventArray);
        } catch (Exception e) {
            promise.reject("GET_EVENTS_BY_TAG_ERROR", "Failed to get events by tag.", e);
        }
    }
}
