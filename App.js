import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RoleScreen from './screens/RoleScreen';
import StudentLoginScreen from './screens/student/StudentLoginScreen';
import StudentRegistration from './screens/student/StudentRegistration';
import TutorLoginScreen from './screens/tutor/TutorLoginScreen';
import TutorRegistration from './screens/tutor/TutorRegistration';
import ModalScreen from './screens/ModalScreen';
import ChatScreen from './screens/ChatScreen';
import { auth } from './screens/firebase';
import { getAuth } from 'firebase/auth';


const Stack = createNativeStackNavigator();


export default function App() {

  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions ={{
        headerShown: false,
        }} headerMode = "none" initialRouteName="Role">
          {user != null ? (
            <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Modal" component={ModalScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Role" component={RoleScreen} />
            </>
          ) : (
            <>
            <Stack.Screen name="Role" component={RoleScreen} /> 
            <Stack.Screen name="StudentRegistration" component={StudentRegistration} />
            <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
            <Stack.Screen name="TutorLogin" component={TutorLoginScreen} />
            <Stack.Screen name="TutorRegistration" component={TutorRegistration} />
            <Stack.Screen name="Modal" component={ModalScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
