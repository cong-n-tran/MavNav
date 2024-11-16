import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataProvider {

    // Inner classes for data structures
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
    }

    public static class ClassInfo {
        private int classId;
        private String className;
        private String professor;
        private Integer capacity;
        private String location;

        public ClassInfo(int classId, String className, String professor, Integer capacity, String location) {
            this.classId = classId;
            this.className = className;
            this.professor = professor;
            this.capacity = capacity;
            this.location = location;
        }
    }

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
    }

}
