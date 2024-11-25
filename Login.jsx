import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from './Firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  //Keepin user logged in
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        navigation.navigate('HomeScreen');
      }
    };

    checkUser();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  
        AsyncStorage.setItem('user', JSON.stringify(user)); 
        navigation.navigate('HomeScreen'); 
      } else {
        setUser(null);  
        navigation.navigate('Login'); 
      }
    });

  
    return () => unsubscribe();
  }, []);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Success', 'You are now logged in!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', `Login failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput style={styles.inputText} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.inputText} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    borderRadius: 5,
    backgroundColor: 'black',
    color: '#00FFFF',
  },

  inputContainer: {
    height: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 44,
    marginBottom: 20,
    color: 'white',
    textShadowColor: '#FDCEDF',
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 1,
  },
  button: {
    marginTop: 30,
    width: '25%',
    height: '10%',
    color: '#004000',
    borderColor: '#00FFFF',
    textAlign: 'center',
    borderWidth: 5,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: 'black',
  },

  text: {
    color: '#FFE6E6',
    fontSize: 24,
  },
  buttonText: {
    textAlign: 'center',
    marginVertical: 14,
    marginHorizontal: 25,
    color: 'white',
    fontSize: 15,
    textShadowColor: '#FDCEDF',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 1,
  },
});

  