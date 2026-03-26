import java.util.HashMap;
import java.util.Map;

public class Profile {

    private static class Student {
        int studentId;
        String firstName;
        String lastName;
        String email;
        String major;

        public Student(int studentId, String firstName, String lastName, String email, String major) {
            this.studentId = studentId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.major = major;
        }
    }

    private static class ClassInfo {
        int classId;
        String className;
        String classProfessor;
        Integer classCapacity;
        String classLocation;

        public ClassInfo(int classId, String className, String classProfessor, Integer classCapacity, String classLocation) {
            this.classId = classId;
            this.className = className;
            this.classProfessor = classProfessor;
            this.classCapacity = classCapacity;
            this.classLocation = classLocation;
        }
    }

    private static class Event {
        String eventName;
        String eventLocation;
        String eventDateAndTime;
        String eventDescription;

        public Event(String eventName, String eventLocation, String eventDateAndTime, String eventDescription) {
            this.eventName = eventName;
            this.eventLocation = eventLocation;
            this.eventDateAndTime = eventDateAndTime;
            this.eventDescription = eventDescription;
        }
    }

    private Student student;
    private Map<String, ClassInfo> classes;
    private Map<String, Event> events;

    public Profile() {
        // Initialize student
        student = new Student(1002006000, "George", "Washington", null, "Computer Science");

        // Initialize classes
        classes = new HashMap<>();
        classes.put("class1", new ClassInfo(1, "Physics", "Spurlock", null, "SH 101"));
        classes.put("class2", new ClassInfo(2, "Calculus", "Yang", null, "SEIR 217"));
        classes.put("class3", new ClassInfo(3, "Pols", "Berry", null, "WH 309"));
        classes.put("class4", new ClassInfo(4, "Economics", "Jobs", null, "NH 102"));

        // Initialize events
        events = new HashMap<>();
        events.put("event1", new Event("Super Saturday", "somewhere", "October 21st, 2024", "yap feast yap feast yap feast yap feast"));
        events.put("event2", new Event("Homecoming", "somewhere", "September 1st, 2024", "yap feast yap feast yap feast yap feast"));
    }

}
