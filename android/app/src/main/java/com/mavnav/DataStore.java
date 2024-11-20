package com.mavnav;

import java.util.ArrayList;
import java.util.List;

public class DataStore {

    private static DataStore instance;

    // Example data structures for storing student, classes, and events
    private DataProvider.Student student;
    private final List<DataProvider.ClassInfo> classes;
    private final List<DataProvider.Event> events;

    // Private constructor for Singleton pattern
    private DataStore() {
        classes = new ArrayList<>();
        events = new ArrayList<>();

        // Initialize with sample data
        initializeSampleData();
    }

    // Singleton instance
    public static synchronized DataStore getInstance() {
        if (instance == null) {
            instance = new DataStore();
        }
        return instance;
    }

    // Initialize sample data (optional)
    private void initializeSampleData() {
        // Initialize student
        student = new DataProvider.Student(
                100200300,
                "Jane",
                "Doe",
                "jane.doe@example.com",
                "Computer Science"
        );

        // Initialize sample classes
        classes.add(new DataProvider.ClassInfo(1, "Physics", "Dr. Spurlock", 30, "Room 101"));
        classes.add(new DataProvider.ClassInfo(2, "Mathematics", "Dr. Yang", 50, "Room 202"));

        // Initialize sample events
        events.add(new DataProvider.Event("Tech Talk", "Main Auditorium", "2024-01-15 10:00 AM", "Learn about the latest tech trends."));
        events.add(new DataProvider.Event("Career Fair", "Expo Center", "2024-03-10 9:00 AM", "Meet top companies and explore job opportunities."));
    }

    // Get the student's information
    public DataProvider.Student getStudentInfo() {
        return student;
    }

    // Set the student's information (optional if editing is needed)
    public void setStudentInfo(DataProvider.Student newStudent) {
        this.student = newStudent;
    }

    // Get the list of classes
    public List<DataProvider.ClassInfo> getClasses() {
        return new ArrayList<>(classes); // Return a copy to avoid modification
    }

    // Get the list of events
    public List<DataProvider.Event> getEvents() {
        return new ArrayList<>(events); // Return a copy to avoid modification
    }

    // Add a class
    public void addClass(DataProvider.ClassInfo classInfo) {
        classes.add(classInfo);
    }

    // Add an event
    public void addEvent(DataProvider.Event event) {
        events.add(event);
    }

    // Remove a class by ID
    public boolean removeClass(int classId) {
        return classes.removeIf(classInfo -> classInfo.getClassId() == classId);
    }

    // Remove an event by name
    public boolean removeEvent(String eventName) {
        return events.removeIf(event -> event.getName().equalsIgnoreCase(eventName));
    }
}
