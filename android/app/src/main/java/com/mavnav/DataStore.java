package com.mavnav;

import java.util.ArrayList;
import java.util.List;

public class DataStore {

    private static DataStore instance;
    private Student student;
    private List<ClassInfo> classes;
    private List<Event> events;

    // Singleton instance of DataStore
    public static synchronized DataStore getInstance() {
        if (instance == null) {
            instance = new DataStore();
        }
        return instance;
    }

    private DataStore() {
        classes = new ArrayList<>();
        events = new ArrayList<>();
        student = new Student("12345", "John", "Doe", "john.doe@example.com", "Computer Science");
    }

    // Student Class
    public static class Student {
        private String studentId;
        private String firstName;
        private String lastName;
        private String email;
        private String major;

        public Student(String studentId, String firstName, String lastName, String email, String major) {
            this.studentId = studentId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.major = major;
        }

        public String getStudentId() {
            return studentId;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public String getEmail() {
            return email;
        }

        public String getMajor() {
            return major;
        }
    }

    // ClassInfo Class
    public static class ClassInfo {
        private String classId; // Updated to String
        private String className;
        private String professor;
        private String capacity;
        private String location;

        public ClassInfo(String classId, String className, String professor, String capacity, String location) {
            this.classId = classId;
            this.className = className;
            this.professor = professor;
            this.capacity = capacity;
            this.location = location;
        }

        public String getClassId() {
            return classId;
        }

        public String getClassName() {
            return className;
        }

        public String getProfessor() {
            return professor;
        }

        public String getCapacity() {
            return capacity;
        }

        public String getLocation() {
            return location;
        }
    }

    // Event Class
    public static class Event {
        private String name;
        private String location;
        private String dateAndTime;
        private String description;

        public Event(String name, String location, String dateAndTime, String description) {
            this.name = name;
            this.location = location;
            this.dateAndTime = dateAndTime;
            this.description = description;
        }

        public String getName() {
            return name;
        }

        public String getLocation() {
            return location;
        }

        public String getDateAndTime() {
            return dateAndTime;
        }

        public String getDescription() {
            return description;
        }
    }

    // Getter for Student
    public Student getStudent() {
        return student;
    }

    // Getters for Classes
    public List<ClassInfo> getClasses() {
        return classes;
    }

    // Add a Class
    public void addClass(String classId, String className, String professor, String capacity, String location) {
        ClassInfo classInfo = new ClassInfo(classId, className, professor, capacity, location);
        classes.add(classInfo);
    }

    // Edit a Class
    public void editClass(String classId, String className, String professor, String capacity, String location) {
        for (ClassInfo classInfo : classes) {
            if (classInfo.getClassId().equals(classId)) {
                classes.remove(classInfo);
                classes.add(new ClassInfo(classId, className, professor, capacity, location));
                return;
            }
        }
    }

    // Remove a Class
    public void removeClass(String classId) {
        classes.removeIf(classInfo -> classInfo.getClassId().equals(classId));
    }

    // Getters for Events
    public List<Event> getEvents() {
        return events;
    }

    // Add an Event
    public void addEvent(String name, String location, String dateAndTime, String description) {
        Event event = new Event(name, location, dateAndTime, description);
        events.add(event);
    }

    // Edit an Event
    public void editEvent(String name, String location, String dateAndTime, String description) {
        for (Event event : events) {
            if (event.getName().equals(name)) {
                events.remove(event);
                events.add(new Event(name, location, dateAndTime, description));
                return;
            }
        }
    }

    // Remove an Event
    public void removeEvent(String name) {
        events.removeIf(event -> event.getName().equals(name));
    }
}
