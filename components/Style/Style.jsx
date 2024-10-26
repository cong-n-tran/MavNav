import { View, Text, Pressable } from 'react-native';
import { styled } from "nativewind";
export const StyledView = styled(View);
export const StyledText = styled(Text);
export const StyledViewProfile = styled(View, 'flex-1 p-6 bg-blue-50');

export const StyledTextProfile = styled(Text, 'text-blue-800 text-base');

export const ProfileContainer = styled(View, 'flex-row justify-between mb-4');

export const ProfileColumn = styled(View, 'flex-1 mx-2');

export const LogoutButton = styled(Pressable, 'bg-blue-500 rounded-full p-3 items-center');
