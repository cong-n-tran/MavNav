package com.mavnav;

public class DataProvider {

    // Inner class representing Student
    public static class Student {
        private int studentId;
        private String firstName;
        private String lastName;
        private String email;
        private String major;

        // Constructor
        public Student(int studentId, String firstName, String lastName, String email, String major) {
            this.studentId = studentId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.major = major;
        }

        // Getters and Setters
        public int getStudentId() {
            return studentId;
        }

        public void setStudentId(int studentId) {
            this.studentId = studentId;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMajor() {
            return major;
        }

        public void setMajor(String major) {
            this.major = major;
        }
    }

    // Inner class representing ClassInfo
    public static class ClassInfo {
        private int classId;
        private String className;
        private String professor;
        private Integer capacity;
        private String location;

        // Constructor
        public ClassInfo(int classId, String className, String professor, Integer capacity, String location) {
            this.classId = classId;
            this.className = className;
            this.professor = professor;
            this.capacity = capacity;
            this.location = location;
        }

        // Getters and Setters
        public int getClassId() {
            return classId;
        }

        public void setClassId(int classId) {
            this.classId = classId;
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

        public Integer getCapacity() {
            return capacity;
        }

        public void setCapacity(Integer capacity) {
            this.capacity = capacity;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }

    // Inner class representing Event
    public static class Event {
        private String name;
        private String location;
        private String dateAndTime;
        private String description;

        // Constructor
        public Event(String name, String location, String dateAndTime, String description) {
            this.name = name;
            this.location = location;
            this.dateAndTime = dateAndTime;
            this.description = description;
        }

        // Getters and Setters
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
    }
}
