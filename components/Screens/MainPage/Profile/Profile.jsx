import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Pressable, Text, Image, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPencil} from '@fortawesome/free-solid-svg-icons';
import {
    StyledText,
    StyledView,
    ProfileContainer,
    ProfileColumn,
    LogoutButton,
} from '../../../Style/Style';

const Profile = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editClassId, setEditClassId] = useState(null); // Track the class being edited
    const [newClass, setNewClass] = useState({ name: '', professor: '', location: '' });
    const [isLoading, setIsLoading] = useState(true);

    const logoutUser = async () => {
        try {
            setIsLoading(true);
            await auth().signOut();
            console.log('User logged out');
            setIsLoading(false);
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
            setIsLoading(false);
        }
    };

    const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
    const semesters = ['Spring 2024', 'Summer 2024', 'Fall 2024', 'Winter 2024'];

    const [student, setStudent] = useState({
        studentId: 1001325996,
        firstName: 'Jason',
        lastName: 'Yeung',
        email: null,
        major: 'Computer Science',
    });

    const [classes, setClasses] = useState({
        'Fall 2024': [
            { classId: 1, className: 'Physics', classProfessor: 'Spurlock', classLocation: 'SH 101' },
            { classId: 2, className: 'Calculus', classProfessor: 'Yang', classLocation: 'SEIR 217' },
        ],
        'Spring 2024': [],
        'Summer 2024': [],
        'Winter 2024': [],
    });

    useEffect(() => {
        const getCurrentUserEmail = async () => {
            try {
                const user = auth().currentUser;
                if (user) {
                    setStudent((prev) => ({ ...prev, email: user.email }));
                } else {
                    console.log("No user is currently signed in.");
                }
            } catch (error) {
                console.error('Error fetching user email:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getCurrentUserEmail();
    }, []);

    const handleSave = () => {
        if (!newClass.name || !newClass.professor || !newClass.location) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        setClasses((prevClasses) => {
            const updatedClasses = { ...prevClasses };
            if (editClassId) {
                // Update existing class
                updatedClasses[selectedSemester] = updatedClasses[selectedSemester].map((classInfo) =>
                    classInfo.classId === editClassId
                        ? { ...classInfo, className: newClass.name, classProfessor: newClass.professor, classLocation: newClass.location }
                        : classInfo
                );
            } else {
                // Add new class
                updatedClasses[selectedSemester].push({
                    classId: updatedClasses[selectedSemester].length + 1,
                    className: newClass.name,
                    classProfessor: newClass.professor,
                    classLocation: newClass.location,
                });
            }
            return updatedClasses;
        });

        setNewClass({ name: '', professor: '', location: '' });
        setEditClassId(null); // Reset edit mode
        setIsEditing(false);
    };

    const handleEditClass = (classInfo) => {
        setEditClassId(classInfo.classId);
        setNewClass({
            name: classInfo.className,
            professor: classInfo.classProfessor,
            location: classInfo.classLocation,
        });
        setIsEditing(true);
    };

    const handleDeleteClass = (classId) => {
        setClasses((prevClasses) => ({
            ...prevClasses,
            [selectedSemester]: prevClasses[selectedSemester].filter((classInfo) => classInfo.classId !== classId),
        }));
    };

    return (
        <ScrollView decelerationRate="normal" className="bg-blue-100">
            {isLoading ? (
                <StyledView className="flex-1 justify-center items-center p-6">
                    <StyledText className="text-blue-800 text-xl">Loading...</StyledText>
                </StyledView>
            ) : (
                <StyledView className="flex-1 justify-center p-6">
                    {/* Header */}
                    <StyledView className="bg-blue-800 p-6 rounded-b-3xl shadow-md mb-4">
                        <StyledText className="text-white text-4xl font-bold mb-2">Profile</StyledText>
                    </StyledView>

                    {/* User Info */}
                    <StyledView className="flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4  border-orange-300 border-4">
                        <StyledView className="flex-1 mr-4">
                            <Text className="text-2xl font-bold text-blue-800">{student.firstName} {student.lastName}</Text>
                            <Text className="text-sm text-gray-600">ID: {student.studentId}</Text>
                            <Text className="text-sm text-gray-600">{student.email || 'Email not available'}</Text>
                        </StyledView>
                        <Image
                            source={require("../../../../assets/images/jason_pic.png")}
                            className="w-20 h-20 rounded-full border-4 border-blue-800"
                        />
                    </StyledView>

                    {/* Semester Picker and Edit Section */}
                    <StyledView className="bg-blue-100 p-4 rounded-lg shadow-md mb-2">
                        <StyledText className="font-extrabold text-3xl text-black mb-4">Classes</StyledText>
                        <StyledView className="flex-row items-center rounded-lg p-1 bg-gray-100">
                            <Picker
                                style={{ flex: 1 }}
                                selectedValue={selectedSemester}
                                onValueChange={(itemValue) => setSelectedSemester(itemValue)}
                            >
                                {semesters.map((semester) => (
                                    <Picker.Item key={semester} label={semester} value={semester} />
                                ))}
                            </Picker>
                            <StyledView className="flex-row justify-end">
                                {isEditing ? (
                                    <Pressable
                                        onPress={handleSave}
                                        className="bg-green-500 px-4 py-2 rounded-lg shadow-md"
                                    >
                                        <Text className="text-white font-semibold">Save</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={() => setIsEditing(true)}
                                        className="bg-blue-500 px-4 py-2 rounded-lg shadow-md"
                                    >
                                        <Text className="text-white font-semibold">+</Text>
                                    </Pressable>
                                )}
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Add/Edit Class Form */}
                    {isEditing && (
                        <StyledView className="p-4 bg-white border border-gray-300 rounded-lg mb-4">
                            <StyledView className="flex-row justify-between items-center mb-4">
                                <StyledText className="text-lg font-bold">
                                    {editClassId ? 'Edit Class' : 'Add New Class'}
                                </StyledText>
                                <Pressable onPress={() => setIsEditing(false)}>
                                    <StyledText className="text-blue-500 font-semibold">Close</StyledText>
                                </Pressable>
                            </StyledView>
                            <TextInput
                                placeholder="Class Name"
                                value={newClass.name}
                                onChangeText={(text) => setNewClass({ ...newClass, name: text })}
                                className="bg-white border border-gray-300 rounded-lg p-2 mb-2 shadow-sm"
                            />
                            <TextInput
                                placeholder="Professor"
                                value={newClass.professor}
                                onChangeText={(text) => setNewClass({ ...newClass, professor: text })}
                                className="bg-white border border-gray-300 rounded-lg p-2 mb-2 shadow-sm"
                            />
                            <TextInput
                                placeholder="Location"
                                value={newClass.location}
                                onChangeText={(text) => setNewClass({ ...newClass, location: text })}
                                className="bg-white border border-gray-300 rounded-lg p-2 shadow-sm"
                            />
                        </StyledView>
                    )}

                    {/* Class List */}
                    {classes[selectedSemester]?.length === 0 ? (
                        <StyledText className="text-gray-500 text-center">No classes available for this semester.</StyledText>
                    ) : (
                        <ProfileContainer>
                            <ProfileColumn>
                                {classes[selectedSemester]?.map((classInfo) => (
                                    <StyledView
                                        key={classInfo.classId}
                                        className="bg-white p-4 rounded-lg shadow-md border-gray-400 border-4 mb-4"
                                    >
                                        <StyledText className="text-xl font-bold text-blue-800 mb-2">
                                            {classInfo.className}
                                        </StyledText>
                                        <View className="space-y-2">
                                            <StyledText className="text-sm text-black">
                                                <Text className="font-semibold">Professor:</Text> {classInfo.classProfessor}
                                            </StyledText>
                                            <StyledText className="text-sm text-black">
                                                <Text className="font-semibold">Location:</Text> {classInfo.classLocation}
                                            </StyledText>
                                        </View>
                                        <View className="flex-row space-x-4 mt-2">
                                            <Pressable
                                                onPress={() => handleEditClass(classInfo)}
                                                className="px-4 py-2 rounded-lg shadow-md"
                                            >
                                                <FontAwesomeIcon icon={faPencil} />
                                            </Pressable>
                                            <Pressable
                                                onPress={() => handleDeleteClass(classInfo.classId)}
                                                className="px-4 py-2 rounded-lg shadow-md"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Pressable>
                                        </View>
                                    </StyledView>
                                ))}
                            </ProfileColumn>
                        </ProfileContainer>
                    )}

                    {/* Logout Button */}
                    <LogoutButton
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md mt-6"
                        onPress={logoutUser}
                    >
                        <StyledText className="text-white font-bold text-lg">Log out</StyledText>
                    </LogoutButton>
                </StyledView>
            )}
        </ScrollView>
    );
};

export default Profile;
