import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

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
    return (
        <View>
            <Text>
                profile!
            </Text>
            <Button title="Logout" onPress={logoutUser} />
        </View>
    );
};

export default Profile;