import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';
import { 
    StyledText, 
    StyledView, 
    ProfileContainer, 
    ProfileColumn, 
    StyledTextProfile, 
    StyledViewProfile, 
    LogoutButton
} from '../../../Style/Style'; // Adjusted path for styles

const { DataStore } = NativeModules;

const Profile = () => {
    const [student, setStudent] = useState(null);
    const [classes, setClasses] = useState([]);
    const [events, setEvents] = useState([]);

    const [isEditingClass, setIsEditingClass] = useState(false);
    const [isEditingEvent, setIsEditingEvent] = useState(false);

    const [editClassData, setEditClassData] = useState({});
    const [editEventData, setEditEventData] = useState({});

    useEffect(() => {
        // Fetch data from DataStore
        DataStore.getClasses()
            .then(data => setClasses(data))
            .catch(err => console.error("Error fetching classes:", err));

        DataStore.getEvents()
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));

        DataStore.getStudent()
            .then(data => setStudent(data))
            .catch(err => console.error("Error fetching student:", err));
    }, []);

    const handleEditClass = () => {
        DataStore.addClass(
            editClassData.classId,
            editClassData.className,
            editClassData.professor,
            editClassData.capacity || "Unknown",
            editClassData.location
        )
            .then(() => {
                const updatedClasses = classes.map(c =>
                    c.classId === editClassData.classId ? editClassData : c
                );
                setClasses(updatedClasses);
                setIsEditingClass(false);
            })
            .catch(err => console.error("Error editing class:", err));
    };

    const handleEditEvent = () => {
        DataStore.addEvent(
            editEventData.name,
            editEventData.location,
            editEventData.dateAndTime,
            editEventData.description
        )
            .then(() => {
                const updatedEvents = events.map(e =>
                    e.name === editEventData.name ? editEventData : e
                );
                setEvents(updatedEvents);
                setIsEditingEvent(false);
            })
            .catch(err => console.error("Error editing event:", err));
    };

    const handleRemoveClass = (classId) => {
        DataStore.removeClass(classId)
            .then(() => {
                const filteredClasses = classes.filter(c => c.classId !== classId);
                setClasses(filteredClasses);
            })
            .catch(err => console.error("Error removing class:", err));
    };

    const handleRemoveEvent = (eventName) => {
        DataStore.removeEvent(eventName)
            .then(() => {
                const filteredEvents = events.filter(e => e.name !== eventName);
                setEvents(filteredEvents);
            })
            .catch(err => console.error("Error removing event:", err));
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

                {/* Classes Section */}
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Classes
                </StyledText>
                <ProfileContainer>
                    {classes.length > 0 ? (
                        classes.map((classItem, index) => (
                            <ProfileColumn key={index}>
                                <StyledTextProfile>Class ID: {classItem.classId}</StyledTextProfile>
                                <StyledTextProfile>Class Name: {classItem.className}</StyledTextProfile>
                                <StyledTextProfile>Professor: {classItem.professor}</StyledTextProfile>
                                <StyledTextProfile>Capacity: {classItem.capacity}</StyledTextProfile>
                                <StyledTextProfile>Location: {classItem.location}</StyledTextProfile>
                                <Pressable
                                    onPress={() => {
                                        setEditClassData(classItem);
                                        setIsEditingClass(true);
                                    }}
                                >
                                    <Text style={styles.editButton}>Edit</Text>
                                </Pressable>
                                <Pressable onPress={() => handleRemoveClass(classItem.classId)}>
                                    <Text style={styles.removeButton}>Remove</Text>
                                </Pressable>
                            </ProfileColumn>
                        ))
                    ) : (
                        <StyledText>No Classes Available</StyledText>
                    )}
                </ProfileContainer>

                {/* Events Section */}
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Events
                </StyledText>
                <ProfileContainer>
                    {events.length > 0 ? (
                        events.map((eventItem, index) => (
                            <ProfileColumn key={index}>
                                <StyledTextProfile>Event Name: {eventItem.name}</StyledTextProfile>
                                <StyledTextProfile>Location: {eventItem.location}</StyledTextProfile>
                                <StyledTextProfile>Date & Time: {eventItem.dateAndTime}</StyledTextProfile>
                                <StyledTextProfile>Description: {eventItem.description}</StyledTextProfile>
                                <Pressable
                                    onPress={() => {
                                        setEditEventData(eventItem);
                                        setIsEditingEvent(true);
                                    }}
                                >
                                    <Text style={styles.editButton}>Edit</Text>
                                </Pressable>
                                <Pressable onPress={() => handleRemoveEvent(eventItem.name)}>
                                    <Text style={styles.removeButton}>Remove</Text>
                                </Pressable>
                            </ProfileColumn>
                        ))
                    ) : (
                        <StyledText>No Events Available</StyledText>
                    )}
                </ProfileContainer>

                {/* Edit Class Modal */}
                <Modal visible={isEditingClass} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Class</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class Name"
                            value={editClassData.className}
                            onChangeText={(text) => setEditClassData({ ...editClassData, className: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Professor"
                            value={editClassData.professor}
                            onChangeText={(text) => setEditClassData({ ...editClassData, professor: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Capacity"
                            value={editClassData.capacity}
                            onChangeText={(text) => setEditClassData({ ...editClassData, capacity: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            value={editClassData.location}
                            onChangeText={(text) => setEditClassData({ ...editClassData, location: text })}
                        />
                        <Button title="Save" onPress={handleEditClass} />
                        <Button title="Cancel" onPress={() => setIsEditingClass(false)} />
                    </View>
                </Modal>

                {/* Edit Event Modal */}
                <Modal visible={isEditingEvent} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Event</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Event Name"
                            value={editEventData.name}
                            onChangeText={(text) => setEditEventData({ ...editEventData, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            value={editEventData.location}
                            onChangeText={(text) => setEditEventData({ ...editEventData, location: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date & Time"
                            value={editEventData.dateAndTime}
                            onChangeText={(text) => setEditEventData({ ...editEventData, dateAndTime: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={editEventData.description}
                            onChangeText={(text) => setEditEventData({ ...editEventData, description: text })}
                        />
                        <Button title="Save" onPress={handleEditEvent} />
                        <Button title="Cancel" onPress={() => setIsEditingEvent(false)} />
                    </View>
                </Modal>
            </StyledView>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    editButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    removeButton: {
        color: 'red',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        width: 300,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
