import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';
import { 
    StyledText, 
    StyledView, 
    StyledTextProfile 
} from '../../../Style/Style';

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
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    // Add Class
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

    // Edit Class
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

    // Remove Class
    const handleRemoveClass = (classId) => {
        DataStore.removeClass(classId)
            .then(() => {
                const filteredClasses = classes.filter(c => c.classId !== classId);
                setClasses(filteredClasses);
            })
            .catch(err => console.error("Error removing class:", err));
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

                {/* Add and Edit Modals */}
                <Modal visible={isAddingClass} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Class</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class ID"
                            keyboardType="numeric"
                            onChangeText={(text) => setNewClassData({ ...newClassData, classId: parseInt(text) })}
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
                            keyboardType="numeric"
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

                <Modal visible={isEditingClass} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Class</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class ID"
                            keyboardType="numeric"
                            value={editClassData.classId ? String(editClassData.classId) : ""}
                            onChangeText={(text) => setEditClassData({ ...editClassData, classId: parseInt(text) })}
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
