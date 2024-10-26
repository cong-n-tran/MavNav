import React, {useState, useEffect} from 'react';
import {ScrollView, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import { 
    StyledText, 
    StyledView, 
    ProfileContainer, 
    ProfileColumn, 
    StyledTextProfile, 
    StyledViewProfile, 
    LogoutButton
  } from '../Style/Style';


const Profile = ({ navigation }) => {
    const logoutUser = () => {
        auth().signOut()
        .then(() => {
            console.log('User logged out');
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    };

    const [student, setStudent] = useState({
        studentId: 1002006000,
        firstName: 'George',
        lastName: 'Washington',
        email: null, 
        major: 'Computer Science',
    });
    const [classes, setClasses] = useState({
        'class1': {
            classId: 1,
            className: 'Physics',
            classProfessor: 'Spurlock',
            classCapacity: null, 
            classLocation: 'SH 101',
        }, 
        'class2' :{
            classId: 2,
            className: 'Calculus',
            classProfessor: 'Yang',
            classCapacity: null, 
            classLocation: 'SEIR 217',
        }, 
        'class3' :{
            classId: 3,
            className: 'Pols',
            classProfessor: 'Berry',
            classCapacity: null, 
            classLocation: 'WH 309',
        }, 
        'class4' :{
            classId: 4,
            className: 'Economics',
            classProfessor: 'Jobs',
            classCapacity: null, 
            classLocation: 'NH 102',
        }, 

    });
    const [events, setEvents] = useState({
        'event1' : {
            eventName: 'Super Saturday', 
            eventLocation: 'somewhere', 
            eventDateAndTime: 'October 21st, 2024', 
            eventDescription: 'yap feast yap feast yap feast yap feast', 
        },
        'event2' : {
            eventName: 'Homecoming', 
            eventLocation: 'somewhere', 
            eventDateAndTime: 'September 1st, 2024', 
            eventDescription: 'yap feast yap feast yap feast yap feast', 
        },
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

    return (
        <ScrollView decelerationRate="normal">
            <StyledView className='flex-1 justify-center bg-blue-50 p-6'>
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Student
                </StyledText>
                <ProfileContainer>
                    <ProfileColumn>
                    <StyledTextProfile>Student ID: {student.studentId}</StyledTextProfile>
                    <StyledTextProfile>First Name: {student.firstName}</StyledTextProfile>
                    <StyledTextProfile>Last Name: {student.lastName}</StyledTextProfile>
                    <StyledTextProfile>Email: {student.email}</StyledTextProfile>
                    <StyledTextProfile>Major: {student.major}</StyledTextProfile>
                    </ProfileColumn>
                </ProfileContainer>
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Classes
                </StyledText>
                <ProfileContainer>
                    <ProfileColumn>
                        {Object.entries(classes).map(([key, classInfo]) => (  
                        <StyledView key={classInfo.classId}>  
                            <StyledText className="text-lg text-gray-700 mb-6">
                                {classInfo.className}
                            </StyledText>
                            <StyledTextProfile>Class Id: {classInfo.classId}</StyledTextProfile>
                            <StyledTextProfile>Class Name: {classInfo.className}</StyledTextProfile>
                            <StyledTextProfile>Class Professor: {classInfo.classProfessor}</StyledTextProfile>
                            <StyledTextProfile>Class capacity: {classInfo.classCapacity}</StyledTextProfile>
                            <StyledTextProfile>Class Location: {classInfo.classLocation}</StyledTextProfile>
                        </StyledView> 
                        ))}
                    </ProfileColumn>
                </ProfileContainer>
                <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                    Events
                </StyledText>
                <ProfileContainer>
                    <ProfileColumn>
                        {Object.entries(events).map(([key, eventInfo]) => (  
                        <StyledView key={eventInfo.eventName}>  
                            <StyledText className="text-lg text-gray-700 mb-6">
                                {eventInfo.eventName}
                            </StyledText>
                            <StyledTextProfile>Event Name: {eventInfo.eventName}</StyledTextProfile>
                            <StyledTextProfile>Event Location: {eventInfo.eventLocation}</StyledTextProfile>
                            <StyledTextProfile>Event Date & Time: {eventInfo.eventDateAndTime}</StyledTextProfile>
                            <StyledTextProfile>Event Description: {eventInfo.eventDescription}</StyledTextProfile>
                        </StyledView> 
                        ))}
                    </ProfileColumn>
                </ProfileContainer>
                <LogoutButton  className= 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onPress={logoutUser} >
                    <StyledText className='text-white font-bold'>
                        login out!
                    </StyledText>
                </LogoutButton>
            </StyledView>
        </ScrollView>
    );
};

export default Profile;