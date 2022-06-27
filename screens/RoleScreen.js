import { StyleSheet, Text, TextInput, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import tailwind from 'tailwind-rn'
import { auth } from './firebase'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore/lite'
import { db } from './firebase'
import tw from "tailwind-rn";


const RoleScreen = () => {
    const navigation = useNavigation()
  
    const goToStudent = async () => {
        //await setDoc(doc(db,"student"))
        navigation.replace("StudentLogin")
        .catch(error => alert(error.message))
    }

    

    const goToTutor = async () => {
        //await setDoc(doc(db,"tutor"))
        navigation.replace("TutorLogin")
        .catch(error => alert(error.message))
    }

    return (
      <View style={styles.buttonContainer} >
        
        <Image
                style={tw("h-20 w-full")}
                resizeMode="contain"
                source={{ uri: "https://clipart.world/wp-content/uploads/2020/09/colorful-brain-clipart-transparent.png" }}
            />
      <Text style={styles.titleHeader}>Welcome To BrainWaves</Text>
      <Text style={styles.titleSelection}>Select Your Role</Text>
        <TouchableOpacity
          onPress={goToStudent}
          style={styles.button}
        >

          <Text style={styles.buttonText}>Student</Text>
         
         </TouchableOpacity>
         <Text style={styles.titleOr}>Or</Text>
         <TouchableOpacity
          onPress={goToTutor}
          style={[styles.button, styles.buttonOutline]}
        >

          <Text style={styles.buttonOutlineText}>Tutor</Text>
        </TouchableOpacity>
        
    </View>
        
      )
    }

export default RoleScreen;

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      
    },
    
  buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 200,
      marginLeft:80,
  },
  button: {
      backgroundColor: '#00293D',
      width: '100%',
      padding: 15, 
      borderRadius: 10, 
      alignItems: 'center',
  },
  buttonOutline: {
      backgroundColor: '#08352b',
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
      alignItems: 'center',
      
  },
  buttonOutlineText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 16, 
      alignItems: 'center',
  
  },

  titleHeader: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 35, 
    alignItems: 'center',
    marginBottom: 60,

   },
   titleOr: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 15, 
    alignItems: 'center',
    marginBottom: 10,
    marginTop:10,
   },
   titleSelection: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 20, 
    alignItems: 'center',
    marginBottom: 10,
    marginTop:10,
   },



  
  })
