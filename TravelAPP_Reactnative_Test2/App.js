
import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//our navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { PlanetProvider } from './PlanetContext';
//our main screens 
import HomeScreen from './HomeScreen'; 
import Signup from './Signup';
import Profile from './Profile';
import login from './login';
//all the firebase tools
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Firebase';
//the screens with the 3d
import GlobeView from './EarthWebView';
import SaturnView from './SaturnWebView';
import VenusView from './VenusWebView';
import MercuryView from './MercuryWebView';
import MarsView from './MarsWebView'






const Stack = createStackNavigator();

export default function App() {
  const[logged,setLogged]=useState(null);
  const[loading,setLoading]=useState(true);

useEffect(()=>{
const log =onAuthStateChanged(auth,(user)=>{

if(user){
  setLogged(user);
}
else{
  setLogged(null)
}
if (loading) {
  return <Text>Loading...</Text>; 
}

setLoading(false);




});
return log(); 
},[]);




  return (
    <PlanetProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
         {/* <Stack.Screen name='login' component={login}/>*/} 
         <Stack.Screen name='Signup' component={Signup}/>
         <Stack.Screen name='GlobeView' component={GlobeView}/>
         <Stack.Screen name='SaturnView' component={SaturnView}/>
         <Stack.Screen name='VenusView' component={VenusView}/>
         <Stack.Screen name='MercuryView' component={MercuryView}/>
         <Stack.Screen name='MarsView' component={MarsView}/>
          
          <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PlanetProvider>
  );
}



