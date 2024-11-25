package com.mavnav;

import java.util.ArrayList;
import java.util.List;

public class DataProvider {

    // Student Class
    public static class Student {
        private int studentId;
        private String firstName;
        private String lastName;
        private String email;
        private String major;

        public Student(int studentId, String firstName, String lastName, String email, String major) {
            this.studentId = studentId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.major = major;
        }

        public int getStudentId() {
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

        @Override
        public String toString() {
            return String.format("Student[id=%d, name=%s %s, email=%s, major=%s]",
                    studentId, firstName, lastName, email, major);
        }
    }

    // ClassInfo Class
    public static class ClassInfo {
        private int classId;
        private String className;
        private String professor;
        private Integer capacity; // Optional, can be null
        private String location;

        public ClassInfo(int classId, String className, String professor, Integer capacity, String location) {
            this.classId = classId;
            this.className = className;
            this.professor = professor;
            this.capacity = capacity;
            this.location = location;
        }

        public int getClassId() {
            return classId;
        }

        public String getClassName() {
            return className;
        }

        public String getProfessor() {
            return professor;
        }

        public Integer getCapacity() {
            return capacity;
        }

        public String getLocation() {
            return location;
        }

        @Override
        public String toString() {
            return String.format("ClassInfo[id=%d, name=%s, professor=%s, capacity=%s, location=%s]",
                    classId, className, professor, (capacity != null ? capacity : "N/A"), location);
        }
    }

    // Event Class
    public static class Event {
        private String eventId; // Unique identifier
        private String name;
        private String location;
        private String dateAndTime;
        private String description;
        private List<String> tags; // Tags for filtering, e.g., "Favorites", "On Campus", etc.

        public Event(String eventId, String name, String location, String dateAndTime, String description, List<String> tags) {
            this.eventId = eventId;
            this.name = name;
            this.location = location;
            this.dateAndTime = dateAndTime;
            this.description = description;
            this.tags = new ArrayList<>(tags); // Defensive copy to prevent external modification
        }

        public String getEventId() {
            return eventId;
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

        @Override
        public String toString() {
            return String.format("Event[id=%s, name=%s, location=%s, dateAndTime=%s, description=%s, tags=%s]",
                    eventId, name, location, dateAndTime, description, tags.toString());
        }
    }

    // Sample Data Generation (Optional)
    public static Student getSampleStudent() {
        return new Student(1002006000, "George", "Washington", "george.washington@example.com", "Computer Science");
    }

    public static List<ClassInfo> getSampleClasses() {
        List<ClassInfo> classes = new ArrayList<>();
        classes.add(new ClassInfo(1, "Physics", "Dr. Spurlock", 30, "Room 101"));
        classes.add(new ClassInfo(2, "Calculus", "Dr. Yang", 25, "Room 217"));
        return classes;
    }

    public static List<Event> getSampleEvents() {
        List<Event> events = new ArrayList<>();
        events.add(new Event("1", "Community Meetup", "Central Park", "2024-12-01 10:00 AM",
                "A meetup for local community members to network and share ideas.", List.of("Favorites")));
        events.add(new Event("2", "Tech Conference", "Downtown Convention Center", "2024-12-10 09:00 AM",
                "A conference showcasing the latest in technology and innovation.", List.of("Favorites")));
        events.add(new Event("3", "Pizza Party", "Student Union", "2024-12-15 06:00 PM",
                "A fun evening with free pizza and games.", List.of("Off Campus")));
        events.add(new Event("4", "Study Party", "Library", "2024-12-18 09:00 PM",
                "Join us for a productive study session!", List.of("On Campus")));
        return events;
    }
}
