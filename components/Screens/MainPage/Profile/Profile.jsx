import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, Button } from 'react-native';
import { NativeModules } from 'react-native';
import { 
    StyledText, 
    StyledView, 
    ProfileContainer, 
    ProfileColumn, 
    StyledTextProfile, 
    StyledViewProfile, 
    LogoutButton
} from '../Style/Style';

const { DataStore } = NativeModules;

const Profile = () => {
    const [student, setStudent] = useState(null);
    const [classInfo, setClassInfo] = useState(null);
    const [event, setEvent] = useState(null);

    // Fetch data from native module
    useEffect(() => {
        // Fetch student information
        DataStore.getStudent()
            .then(data => setStudent(data))
            .catch(err => console.error("Error fetching student:", err));

        // Fetch class information
        DataStore.getClass()
            .then(data => setClassInfo(data))
            .catch(err => console.error("Error fetching class:", err));

        // Fetch event information
        DataStore.getEvent()
            .then(data => setEvent(data))
            .catch(err => console.error("Error fetching event:", err));
    }, []);

    const saveStudentData = () => {
        // Save new student data to native module
        DataStore.saveStudent(1003007000, "John", "Doe", "john.doe@example.com", "Mathematics");
    };

    const saveClassData = () => {
        // Save new class data to native module
        DataStore.saveClass(1, "Physics", "Dr. Smith", "50", "Room 101");
    };

    const saveEventData = () => {
        // Save new event data to native module
        DataStore.saveEvent("Tech Talk", "Main Auditorium", "March 15th, 2024", "A talk about the latest tech trends.");
    };

    return (
        <ScrollView>
            <StyledView className="flex-1 justify-center bg-blue-50 p-6">
                {/* Student Section */}
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Student
                </StyledText>
                <ProfileContainer>
                    {student ? (
                        <ProfileColumn>
                            <StyledTextProfile>Student ID: {student.studentId}</StyledTextProfile>
                            <StyledTextProfile>First Name: {student.firstName}</StyledTextProfile>
                            <StyledTextProfile>Last Name: {student.lastName}</StyledTextProfile>
                            <StyledTextProfile>Email: {student.email}</StyledTextProfile>
                            <StyledTextProfile>Major: {student.major}</StyledTextProfile>
                        </ProfileColumn>
                    ) : (
                        <StyledText>Loading Student Info...</StyledText>
                    )}
                </ProfileContainer>
                <Button title="Save Student Data" onPress={saveStudentData} />

                {/* Class Section */}
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Classes
                </StyledText>
                <ProfileContainer>
                    {classInfo ? (
                        <ProfileColumn>
                            <StyledTextProfile>Class ID: {classInfo.classId}</StyledTextProfile>
                            <StyledTextProfile>Class Name: {classInfo.className}</StyledTextProfile>
                            <StyledTextProfile>Professor: {classInfo.professor}</StyledTextProfile>
                            <StyledTextProfile>Capacity: {classInfo.capacity}</StyledTextProfile>
                            <StyledTextProfile>Location: {classInfo.location}</StyledTextProfile>
                        </ProfileColumn>
                    ) : (
                        <StyledText>Loading Class Info...</StyledText>
                    )}
                </ProfileContainer>
                <Button title="Save Class Data" onPress={saveClassData} />

                {/* Event Section */}
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Events
                </StyledText>
                <ProfileContainer>
                    {event ? (
                        <ProfileColumn>
                            <StyledTextProfile>Event Name: {event.name}</StyledTextProfile>
                            <StyledTextProfile>Location: {event.location}</StyledTextProfile>
                            <StyledTextProfile>Date & Time: {event.dateAndTime}</StyledTextProfile>
                            <StyledTextProfile>Description: {event.description}</StyledTextProfile>
                        </ProfileColumn>
                    ) : (
                        <StyledText>Loading Event Info...</StyledText>
                    )}
                </ProfileContainer>
                <Button title="Save Event Data" onPress={saveEventData} />

                {/* Clear Data */}
                <LogoutButton onPress={() => DataStore.clearAllData()}>
                    <StyledText className="text-white font-bold">Clear All Data</StyledText>
                </LogoutButton>
            </StyledView>
        </ScrollView>
    );
};

export default Profile;
