import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import HomeScreen from '../HomeScreen';

const StudentLoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 


  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const goToRegister = async () => {
    //await setDoc(doc(db,"tutor"))
    navigation.replace("StudentRegistration")
    .catch(error => alert(error.message))
}
  
  const handleLogin = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message));
    }

    const handleBack = async () => {
        navigation.replace("Role")
        .catch(error => alert(error.message))
        }
    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <Text style={styles.titleHeader}>Welcome Back</Text>
          <View style={styles.inputContainer}> 
            <TextInput 
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput 
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View> 
        
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.button}
            >
    
              <Text style={styles.buttonText}>Login</Text>
             
             </TouchableOpacity>
             <Text style={styles.textQuestion}>Dont have an account?</Text>
             <TouchableOpacity
              onPress={goToRegister}
              style={[styles.button, styles.buttonOutline]}
            >
    
              <Text style={styles.buttonOutlineText}>Register Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.buttonNew}
            >
    
              <Text style={styles.buttonTextNew}>Back</Text>
            </TouchableOpacity>
          </View> 
        </KeyboardAvoidingView>   
      )
    }
    
    export default StudentLoginScreen
    
    const styles = StyleSheet.create({
      container: { 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
      },
      inputContainer: {
          width: '80%'
      },
    input: { 
        backgroundColor: '#b4c3d3',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#03254c',
        width: '100%',
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#b4c3d3',
        marginTop: 5,
        width: '100%',
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center',
    
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16, 
    },
    buttonOutlineText: {
        color: '#03254c',
        fontWeight: '700',
        fontSize: 16, 
    
    },
    buttonTextNew: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16, 
        
    },
    buttonNew: {
        backgroundColor: '#03254c',
        width: '40%',
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center',
        marginTop: 20,
    },
    textQuestion: {
      color: '#000000',
      fontWeight: '700',
      fontSize: 15, 
      alignItems: 'center',
      marginTop:15,
     },
     titleHeader: {
      color: '#000000',
      fontWeight: '800',
      fontSize: 35, 
      alignItems: 'center',
      marginBottom: 60,
  
     },

    
    })

