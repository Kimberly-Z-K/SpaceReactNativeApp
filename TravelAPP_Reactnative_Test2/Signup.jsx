import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth, db } from './Firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); 

  const HandleSignup = async () => {
    if (!email || !password || !name || !surname || !username) {
      Alert.alert('Error', 'Please fill up all empty spaces!');
      return;
    }
    
    try {
      setLoading(true); 
      const userDetails = await createUserWithEmailAndPassword(auth, email, password);
      const user = userDetails.user;
      console.log('User created with email:', email);
      
      await addDoc(collection(db, 'users'), {
        Name: name,
        Surname: surname,
        UserName: username,
        Email: email,
      });
      console.log('Your information has been saved :o');
      
      navigation.navigate('login');
      Alert.alert('*Your account has been created *');
      
    } catch (error) {
      console.error('Error during signup:', error.message);
      Alert.alert('You failed to make it signup bestie 8(', error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>Signup</Text>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.inputText}
        value={username}
        onChangeText={setUsername}
        placeholder='Enter username'
      />

      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.inputText}
        value={name}
        onChangeText={setName}
        placeholder='Enter name'
      />

      <Text style={styles.text}>Surname</Text>
      <TextInput
        style={styles.inputText}
        value={surname}
        onChangeText={setSurname}
        placeholder='Enter surname'
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.inputText}
        value={email}
        onChangeText={setEmail} 
        placeholder='Enter email'
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.inputText}
        value={password}
        onChangeText={setPassword}
        placeholder='Enter password'
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={HandleSignup}
        disabled={loading} 
      >
        <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up!'}</Text>
      </TouchableOpacity>
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

