import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Pressable, Text, Image, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import {
    StyledText,
    StyledView,
    ProfileContainer,
    ProfileColumn,
    LogoutButton
} from '../../../Style/Style';

const Profile = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newClass, setNewClass] = useState({ name: '', professor: '', location: '' });

    const logoutUser = () => {
        auth().signOut()
            .then(() => {
                console.log('User logged out');
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    };

    const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
    const semesters = ['Spring 2024', 'Summer 2024', 'Fall 2024', 'Winter 2024'];

    const [student, setStudent] = useState({
        studentId: 1002006000,
        firstName: 'George',
        lastName: 'Washington',
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
        const getCurrentUserEmail = () => {
            const user = auth().currentUser;
            if (user) {
                return user.email;
            }
            return null;
        };

        const email = getCurrentUserEmail();
        if (email) {
            setStudent((prev) => ({ ...prev, email }));
        } else {
            console.log("No user is currently signed in.");
        }
    }, []);

    const handleSave = () => {
        if (newClass.name && newClass.professor && newClass.location) {
            setClasses((prevClasses) => ({
                ...prevClasses,
                [selectedSemester]: [
                    ...prevClasses[selectedSemester],
                    {
                        classId: prevClasses[selectedSemester].length + 1,
                        className: newClass.name,
                        classProfessor: newClass.professor,
                        classLocation: newClass.location,
                    },
                ],
            }));
            setNewClass({ name: '', professor: '', location: '' });
            setIsEditing(false);
        }
    };

    return (
        <ScrollView decelerationRate="normal">
            <StyledView className='flex-1 justify-center p-6'>
                <StyledView className='flex-1'>
                    <StyledText className='text-4xl font-bold text-blue-800 mb-4'>Profile</StyledText>
                </StyledView>
                <StyledView className='flex-row justify-between items-center mb-4'>
                    <StyledView className='flex-1 mr-4'>
                        <Text className='text-2xl font-bold text-gray-800'>{student.firstName} {student.lastName}</Text>
                        <Text className='text-sm text-gray-600'>ID: {student.studentId}</Text>
                        <Text className='text-sm text-gray-600'>{student.email}</Text>
                    </StyledView>
                    <Image
                        source={{ uri: 'https://picsum.photos/200/300 ' }}
                        className='w-20 h-20 rounded-full border-2 border-gray-300'
                    />
                </StyledView>
                <StyledView className="mb-4 bg-gray-100">
                    <StyledText className="text-xl font-bold text-blue-800 mb-4">Classes</StyledText>
                    <StyledView className="flex-row items-center bg-white border border-gray-300 rounded-lg p-2">
                        {/* Semester Dropdown */}
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
                                    className="bg-green-500 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-white">Save</Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={() => setIsEditing(true)}
                                    className="bg-blue-500 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-white">Edit</Text>
                                </Pressable>
                            )}
                        </StyledView>
                    </StyledView>
                </StyledView>
                {isEditing && (
                    <StyledView className="p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4">
                        <StyledView className='flex flex-row justify-between items-center w-full'>
                            <StyledText className="text-lg font-bold mb-2">Add New Class</StyledText>
                            <StyledText onPress={() => { setIsEditing(false) }} className="text-md font-normal mb-2">Close</StyledText>
                        </StyledView>
                        <TextInput
                            placeholder="Class Name"
                            value={newClass.name}
                            onChangeText={(text) => setNewClass({ ...newClass, name: text })}
                            className="bg-white border border-gray-300 rounded-lg p-2 mb-2"
                        />
                        <TextInput
                            placeholder="Professor"
                            value={newClass.professor}
                            onChangeText={(text) => setNewClass({ ...newClass, professor: text })}
                            className="bg-white border border-gray-300 rounded-lg p-2 mb-2"
                        />
                        <TextInput
                            placeholder="Location"
                            value={newClass.location}
                            onChangeText={(text) => setNewClass({ ...newClass, location: text })}
                            className="bg-white border border-gray-300 rounded-lg p-2"
                        />
                    </StyledView>
                )}
                <ProfileContainer>
                    <ProfileColumn>
                        {classes[selectedSemester]?.map((classInfo, index) => (
                            <StyledView
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4"
                            >
                                <StyledText className="text-xl font-bold text-blue-700 mb-4">
                                    {classInfo.className}
                                </StyledText>
                                <View className="space-y-2">
                                    <StyledText className="text-sm text-gray-600">
                                        <Text className="font-semibold">Professor:</Text> {classInfo.classProfessor}
                                    </StyledText>
                                    <StyledText className="text-sm text-gray-600">
                                        <Text className="font-semibold">Location:</Text> {classInfo.classLocation}
                                    </StyledText>
                                </View>
                            </StyledView>
                        ))}
                    </ProfileColumn>
                </ProfileContainer>


                <LogoutButton className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onPress={logoutUser}>
                    <StyledText className='text-white font-bold'>Log out</StyledText>
                </LogoutButton>
            </StyledView>
        </ScrollView>
    );
};

export default Profile;