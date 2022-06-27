import { useNavigation } from '@react-navigation/core'
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useLayoutEffect, useReducer, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tw from "tailwind-rn";
import { auth } from './firebase'

const ModalScreen = () => {
    const { user } = auth.currentUser;
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
        setStatusBarBackgroundColor(doc(db, 'student' || 'tutor', auth.currentUser.uid), {
            id: auth.currentUser.uid,
            displayName: auth.currentUser.fullName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(()=> {
            navigation.navigate('Home');
        })
        .catch((error) => {
            alert(error.message);
        });
    };
    
    return (
        <View style={tw("flex-1 items-center pt-1")}>
            <Image
                style={tw("h-20 w-full")}
                resizeMode="contain"
                source={{ uri: "https://img.freepik.com/free-vector/colorful-hand-drawn-welcome-landing-page_23-2148274061.jpg?w=2000" }}
            />

            <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
                Welcome {auth.currentUser.fullName}
            </Text>

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 1: The Profile Pic
            </Text>
            <TextInput
            value={image}
            onChangeText={text => setImage(text)}
                style={tw("text-center text-xl pb-2")}
                placeholder="Enter a Profile Pic URL"
            />

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 2: The Job
            </Text>
            <TextInput
            value={job}
            onChangeText={text => setJob(text)}
                style={tw("text-center text-xl pb-2")}
                placeholder="Enter your occupation"
            />

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 3: The Age
            </Text>
            <TextInput
            value={age}
            onChangeText={text => setAge(text)}
                style={tw("text-center text-xl pb-2")}
                placeholder="Enter your age"
                keyboardType="numeric"
                maxLength={2}
            />

            <TouchableOpacity 
            disabled={incompleteForm}
            style={[tw('w-64 p-3 rounded-xl absolute bottom-10'), 
                incompleteForm ? tw('bg-gray-400') : tw("bg-red-400"),
            ]}
            onPress={updateUserProfile}
            >
                <Text style ={tw("text-center text-white text-xl")}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalScreen;