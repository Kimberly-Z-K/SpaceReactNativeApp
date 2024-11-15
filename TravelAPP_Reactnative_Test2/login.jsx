import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image,Button,Alert } from 'react-native';
import { PlanetContext } from './PlanetContext';

import {HomeScreen} from './HomeScreen';

import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth,db} from './Firebase';
export default function login() {

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const navigation = useNavigation();

const handleLogin=async()=>{
    

    if(!email || !password){
        Alert.alert('please fill up all the empty spaces');
        return;
    }
   try{
     await signInWithEmailAndPassword(auth,email,password);
     Alert.alert('Youre locked in bestie :)!');
     navigation.navigate('HomeScreen');
   }
catch(error){
    Alert.alert('couldnt login sorry :(',error.message);
}

}



    return(
        <View style={styles.inputContainer}>
         <Text style={styles.title}>Login</Text>
        <Text style={styles.text}>email</Text>
         <TextInput value={email}
         style={styles.inputText}
         onChangeText={setEmail}placeholder='Enter username'/>
         <Text style={styles.text}>Password</Text>
         <TextInput value={password} style={styles.inputText} onChangeText={setPassword} placeholder='Enter password' secureTextEntry={true}/>
         <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
          
         <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Signup')}><Text style={styles.buttonText}>Sign  up</Text></TouchableOpacity>
        </View>
     

    );
}

const styles = StyleSheet.create({
    inputText: {
      width: '80%',
      borderColor: '#00FFFF',
      borderWidth: 1,
      marginVertical: 10,
      padding: 10,
      borderRadius:5,
      backgroundColor:'black',
      color:'#00FFFF',
    },
    
    inputContainer: {
      height:'100%',
      padding: 20,
      alignItems: 'center',
      backgroundColor:'black',
    },
    title: {
      marginTop:10,
      marginBottom:10,
      fontSize: 44,
      marginBottom: 20,
      color:'white',
      textShadowColor: '#FDCEDF',
      textShadowOffset: { width: 3, height:2},
      textShadowRadius: 1, 
    },
    button:{
     // textShadowColor: '#FDCEDF',
     // textShadowOffset: { width: 2, height:1 },
     marginTop:30,
      width:'25%',
      height:'10%',
      color:'#004000',
      borderColor:'#00FFFF',
      textAlign:'center',
      borderWidth:5,
      borderRadius:25,
      borderWidth: 1,
      backgroundColor:'black',
     
    },
   
    text:{
      color:'#FFE6E6',
      fontSize: 24,
     
    },
    buttonText:{
      textAlign:'center',
      marginVertical:14,
      marginHorizontal:25,
      color:'white',
      fontSize:15,
      textShadowColor: '#FDCEDF',
      textShadowOffset: { width: 2, height:1 },
      textShadowRadius: 1, 
    }
  });
  
  