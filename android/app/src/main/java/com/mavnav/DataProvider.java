package com.mavnav;

public class DataProvider {

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
}
