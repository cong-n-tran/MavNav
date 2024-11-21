import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';
import { StyledText, StyledView, StyledTextProfile } from '../../../Style/Style';

const { DataStore } = NativeModules;

const Profile = () => {
    const [student, setStudent] = useState(null);
    const [classes, setClasses] = useState([]);
    const [events, setEvents] = useState([]);

    const [isAddingClass, setIsAddingClass] = useState(false);
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [isEditingClass, setIsEditingClass] = useState(false);
    const [isEditingEvent, setIsEditingEvent] = useState(false);

    const [newClassData, setNewClassData] = useState({});
    const [newEventData, setNewEventData] = useState({});
    const [editClassData, setEditClassData] = useState({});
    const [editEventData, setEditEventData] = useState({});

    useEffect(() => {
        DataStore.getStudent()
            .then(data => setStudent(data))
            .catch(err => console.error("Error fetching student:", err));

        DataStore.getClasses()
            .then(data => setClasses(data))
            .catch(err => console.error("Error fetching classes:", err));

        DataStore.getEvents()
            .then(data => {
                console.log("Fetched events:", data);
                setEvents(data);
            })
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    const handleAddClass = () => {
        DataStore.addClass(
            newClassData.classId,
            newClassData.className,
            newClassData.professor,
            newClassData.capacity || "Unknown",
            newClassData.location
        )
            .then(() => {
                setClasses([...classes, newClassData]);
                setIsAddingClass(false);
            })
            .catch(err => console.error("Error adding class:", err));
    };

    const handleAddEvent = () => {
        DataStore.addEvent(
            newEventData.name,
            newEventData.location,
            newEventData.dateAndTime,
            newEventData.description
        )
            .then(() => {
                setEvents([...events, newEventData]);
                setIsAddingEvent(false);
            })
            .catch(err => console.error("Error adding event:", err));
    };

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

    const handleRemoveEvent = (name) => {
        DataStore.removeEvent(name)
            .then(() => {
                const filteredEvents = events.filter(e => e.name !== name);
                setEvents(filteredEvents);
            })
            .catch(err => console.error("Error removing event:", err));
    };

    return (
        <ScrollView>
            <StyledView style={styles.container}>
                {/* Student Section */}
                <StyledText style={styles.headerText}>Student</StyledText>
                {student ? (
                    <View style={styles.profileSection}>
                        <StyledTextProfile>Student ID: {student.studentId}</StyledTextProfile>
                        <StyledTextProfile>First Name: {student.firstName}</StyledTextProfile>
                        <StyledTextProfile>Last Name: {student.lastName}</StyledTextProfile>
                        <StyledTextProfile>Email: {student.email}</StyledTextProfile>
                        <StyledTextProfile>Major: {student.major}</StyledTextProfile>
                    </View>
                ) : (
                    <StyledText>Loading Student Info...</StyledText>
                )}

                {/* Classes Section */}
                <StyledText style={styles.headerText}>Classes</StyledText>
                <Button title="Add Class" onPress={() => setIsAddingClass(true)} />
                <View style={styles.verticalList}>
                    {classes.length > 0 ? (
                        classes.map((classItem, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <StyledTextProfile>Class ID: {classItem.classId}</StyledTextProfile>
                                <StyledTextProfile>Class Name: {classItem.className}</StyledTextProfile>
                                <StyledTextProfile>Professor: {classItem.professor}</StyledTextProfile>
                                <StyledTextProfile>Capacity: {classItem.capacity}</StyledTextProfile>
                                <StyledTextProfile>Location: {classItem.location}</StyledTextProfile>
                                <View style={styles.actionButtons}>
                                    <Pressable onPress={() => {
                                        setEditClassData(classItem);
                                        setIsEditingClass(true);
                                    }}>
                                        <Text style={styles.editButton}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => handleRemoveClass(classItem.classId)}>
                                        <Text style={styles.removeButton}>Remove</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    ) : (
                        <StyledText>No Classes Available</StyledText>
                    )}
                </View>

                {/* Events Section */}
                <StyledText style={styles.headerText}>Events</StyledText>
                <Button title="Add Event" onPress={() => setIsAddingEvent(true)} />
                <View style={styles.verticalList}>
                    {events.length > 0 ? (
                        events.map((eventItem, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <StyledTextProfile>Event Name: {eventItem.name}</StyledTextProfile>
                                <StyledTextProfile>Location: {eventItem.location}</StyledTextProfile>
                                <StyledTextProfile>Date & Time: {eventItem.dateAndTime}</StyledTextProfile>
                                <StyledTextProfile>Description: {eventItem.description}</StyledTextProfile>
                                <View style={styles.actionButtons}>
                                    <Pressable onPress={() => {
                                        setEditEventData(eventItem);
                                        setIsEditingEvent(true);
                                    }}>
                                        <Text style={styles.editButton}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => handleRemoveEvent(eventItem.name)}>
                                        <Text style={styles.removeButton}>Remove</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    ) : (
                        <StyledText>No Events Available</StyledText>
                    )}
                </View>

                {/* Add/Edit Modals for Classes and Events */}
                <Modal visible={isAddingClass} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Class</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class ID"
                            onChangeText={(text) => setNewClassData({ ...newClassData, classId: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Class Name"
                            onChangeText={(text) => setNewClassData({ ...newClassData, className: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Professor"
                            onChangeText={(text) => setNewClassData({ ...newClassData, professor: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Capacity"
                            onChangeText={(text) => setNewClassData({ ...newClassData, capacity: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            onChangeText={(text) => setNewClassData({ ...newClassData, location: text })}
                        />
                        <Button title="Save" onPress={handleAddClass} />
                        <Button title="Cancel" onPress={() => setIsAddingClass(false)} />
                    </View>
                </Modal>

                <Modal visible={isAddingEvent} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Event</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Event Name"
                            onChangeText={(text) => setNewEventData({ ...newEventData, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            onChangeText={(text) => setNewEventData({ ...newEventData, location: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date & Time"
                            onChangeText={(text) => setNewEventData({ ...newEventData, dateAndTime: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            onChangeText={(text) => setNewEventData({ ...newEventData, description: text })}
                        />
                        <Button title="Save" onPress={handleAddEvent} />
                        <Button title="Cancel" onPress={() => setIsAddingEvent(false)} />
                    </View>
                </Modal>

                <Modal visible={isEditingClass} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Class</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class ID"
                            value={editClassData.classId}
                            onChangeText={(text) => setEditClassData({ ...editClassData, classId: text })}
                        />
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
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#343a40',
    },
    profileSection: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    verticalList: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 8,
    },
    editButton: {
        color: 'blue',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
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
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
