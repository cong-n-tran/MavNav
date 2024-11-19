package com.mavnav;

import android.content.Context;
import android.content.SharedPreferences;

public class DataStore {

    private static final String PREF_NAME = "app_data";
    private SharedPreferences sharedPreferences;

    public DataStore(Context context) {
        this.sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
    }

    // Save Student Information
    public void saveStudentInfo(int studentId, String firstName, String lastName, String email, String major) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt("student_id", studentId);
        editor.putString("student_first_name", firstName);
        editor.putString("student_last_name", lastName);
        editor.putString("student_email", email);
        editor.putString("student_major", major);
        editor.apply();
    }

    // Retrieve Student Information
    public DataProvider.Student getStudentInfo() {
        int studentId = sharedPreferences.getInt("student_id", -1);
        String firstName = sharedPreferences.getString("student_first_name", "Unknown");
        String lastName = sharedPreferences.getString("student_last_name", "Unknown");
        String email = sharedPreferences.getString("student_email", "Unknown");
        String major = sharedPreferences.getString("student_major", "Undeclared");
        return new DataProvider.Student(studentId, firstName, lastName, email, major);
    }

    // Save Class Information
    public void saveClassInfo(int classId, String className, String professor, Integer capacity, String location) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt("class_id", classId);
        editor.putString("class_name", className);
        editor.putString("class_professor", professor);
        editor.putString("class_capacity", capacity != null ? capacity.toString() : "Unknown");
        editor.putString("class_location", location);
        editor.apply();
    }

    // Retrieve Class Information
    public DataProvider.ClassInfo getClassInfo() {
        int classId = sharedPreferences.getInt("class_id", -1);
        String className = sharedPreferences.getString("class_name", "Unknown");
        String professor = sharedPreferences.getString("class_professor", "Unknown");
        String capacityStr = sharedPreferences.getString("class_capacity", "Unknown");
        String location = sharedPreferences.getString("class_location", "Unknown");
        Integer capacity = capacityStr.equals("Unknown") ? null : Integer.parseInt(capacityStr);
        return new DataProvider.ClassInfo(classId, className, professor, capacity, location);
    }

    // Save Event Information
    public void saveEventInfo(String name, String location, String dateAndTime, String description) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("event_name", name);
        editor.putString("event_location", location);
        editor.putString("event_date_time", dateAndTime);
        editor.putString("event_description", description);
        editor.apply();
    }

    // Retrieve Event Information
    public DataProvider.Event getEventInfo() {
        String name = sharedPreferences.getString("event_name", "Unknown");
        String location = sharedPreferences.getString("event_location", "Unknown");
        String dateAndTime = sharedPreferences.getString("event_date_time", "Unknown");
        String description = sharedPreferences.getString("event_description", "No description");
        return new DataProvider.Event(name, location, dateAndTime, description);
    }

    // Clear All Data
    public void clearAllData() {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
    }
}
