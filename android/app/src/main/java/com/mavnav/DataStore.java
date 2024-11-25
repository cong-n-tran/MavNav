package com.mavnav;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        // Initialize with default data
        student = new Student("1002006000", "George", "Washington", "george.washington@example.com", "Computer Science");

        classes = new ArrayList<>();
        classes.add(new ClassInfo("1", "Physics", "Dr. Spurlock", "Room 101"));
        classes.add(new ClassInfo("2", "Calculus", "Dr. Yang", "Room 217"));

        events = new ArrayList<>();
        events.add(new Event("1", "Community Meetup", "Central Park", "2024-12-01 10:00 AM",
                "A meetup for local community members to network and share ideas.", List.of("Favorites")));
        events.add(new Event("2", "Tech Conference", "Downtown Convention Center", "2024-12-10 09:00 AM",
                "A conference showcasing the latest in technology and innovation.", List.of("Favorites")));
        events.add(new Event("3", "Pizza Party", "Student Union", "2024-12-15 06:00 PM",
                "A fun evening with free pizza and games.", List.of("Off Campus")));
        events.add(new Event("4", "Study Party", "Library", "2024-12-18 09:00 PM",
                "Join us for a productive study session!", List.of("On Campus")));
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

        public void setEmail(String email) {
            this.email = email;
        }

        public void setMajor(String major) {
            this.major = major;
        }
    }

    // ClassInfo Class
    public static class ClassInfo {
        private String classId;
        private String className;
        private String professor;
        private String location;

        public ClassInfo(String classId, String className, String professor, String location) {
            this.classId = classId;
            this.className = className;
            this.professor = professor;
            this.location = location;
        }

        public String getClassId() {
            return classId;
        }

        public String getClassName() {
            return className;
        }

        public void setClassName(String className) {
            this.className = className;
        }

        public String getProfessor() {
            return professor;
        }

        public void setProfessor(String professor) {
            this.professor = professor;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }

    // Event Class
    public static class Event {
        private String eventId;
        private String name;
        private String location;
        private String dateAndTime;
        private String description;
        private List<String> tags;

        public Event(String eventId, String name, String location, String dateAndTime, String description, List<String> tags) {
            this.eventId = eventId;
            this.name = name;
            this.location = location;
            this.dateAndTime = dateAndTime;
            this.description = description;
            this.tags = new ArrayList<>(tags);
        }

        public String getEventId() {
            return eventId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getDateAndTime() {
            return dateAndTime;
        }

        public void setDateAndTime(String dateAndTime) {
            this.dateAndTime = dateAndTime;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<String> getTags() {
            return tags;
        }

        public void setTags(List<String> tags) {
            this.tags = new ArrayList<>(tags);
        }

        public boolean hasTag(String tag) {
            return tags.contains(tag);
        }

        public void toggleFavorite() {
            if (tags.contains("Favorites")) {
                tags.remove("Favorites");
            } else {
                tags.add("Favorites");
            }
        }
    }

    // Student-related methods
    public Student getStudent() {
        return student;
    }

    // Class-related methods
    public List<ClassInfo> getClasses() {
        return classes;
    }

    public void addClass(String classId, String className, String professor, String location) {
        classes.add(new ClassInfo(classId, className, professor, location));
    }

    public void editClass(String classId, String className, String professor, String location) {
        for (ClassInfo classInfo : classes) {
            if (classInfo.getClassId().equals(classId)) {
                classInfo.setClassName(className);
                classInfo.setProfessor(professor);
                classInfo.setLocation(location);
                return;
            }
        }
    }

    public void removeClass(String classId) {
        classes.removeIf(classInfo -> classInfo.getClassId().equals(classId));
    }

    // Event-related methods
    public List<Event> getEvents() {
        return events;
    }

    public List<Event> getEventsByTag(String tag) {
        if (tag.equals("All")) {
            return new ArrayList<>(events);
        }
        return events.stream().filter(event -> event.hasTag(tag)).collect(Collectors.toList());
    }

    public void addEvent(String name, String location, String dateAndTime, String description, List<String> tags) {
        String eventId = String.valueOf(events.size() + 1);
        events.add(new Event(eventId, name, location, dateAndTime, description, tags));
    }

    public void editEvent(String eventId, String name, String location, String dateAndTime, String description, List<String> tags) {
        for (Event event : events) {
            if (event.getEventId().equals(eventId)) {
                event.setName(name);
                event.setLocation(location);
                event.setDateAndTime(dateAndTime);
                event.setDescription(description);
                event.setTags(tags);
                return;
            }
        }
    }

    public void removeEvent(String eventId) {
        events.removeIf(event -> event.getEventId().equals(eventId));
    }

    public void toggleFavorite(String eventId) {
        for (Event event : events) {
            if (event.getEventId().equals(eventId)) {
                event.toggleFavorite();
                return;
            }
        }
    }
}
