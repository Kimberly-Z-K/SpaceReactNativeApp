import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable, FlatList,ScrollView } from 'react-native';
import { PlanetContext } from './PlanetContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { planData } = useContext(PlanetContext); 
  const [planetData, setPlanetData] = useState(null);  
  const [pla, setPla] = useState('');  

  const fetchResponse = async () => {
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${pla}&origin=*`);
      const data = await response.json();
      const pageId = Object.keys(data.query.pages)[0];
      const actualInfo = data.query.pages[pageId].extract;
      setPlanetData({ name: pla, info: actualInfo });
    } catch (error) {
      console.error(`Couldn't fetch data about ${pla}:`, error);
    }
  };

  const removePlanetData = () => {
    setPlanetData(null);
  };

 
    const ClickedPlanet=(image)=>{

      if(image === require('./assets/Illustrating_Environmental_Awareness__Cartoon_3D_Earth_Icon-removebg-preview.png')){
        navigation.navigate('GlobeView');
      }
      
      else if(image === require('./assets/Venus_stock_illustration__Illustration_of_rotate__astrology_-_10158221-removebg-preview.png')){
        navigation.navigate('VenusView');
      }
     
      else if(image === require('./assets/Mars-removebg-preview.png')){
        navigation.navigate('MarsView');
      }
      
      else if(image === require('./assets/Saturn_and_its_rings-removebg-preview.png')){
        navigation.navigate('SaturnView');
      }
     
      if(image === require('./assets/Spinning_Mercury__Nasa_reveal_stunning_animation_showing_giant_craters_on_the_planet_s_surface-removebg-preview.png')){
        navigation.navigate('MercuryView');
      }
     
    };
    
 

  return (
    <LinearGradient colors={['#682860', '#800080', '#4b0082', '#6c3082', '#4b0082']}
    start={{ x: 1, y: 2 }}
    end={{ x: 0, y: 2 }}
    style={{ flex: 1 }}
  >
    <ScrollView style={styles.container}>
     
        <Text style={styles.header}>Planet Information</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            value={pla} 
            placeholder='Enter a planet' 
            onChangeText={(text) => setPla(text)} 
            style={styles.input}
          />
          <TouchableOpacity onPress={fetchResponse}>
            <Icon name="search" size={24} color="#000" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {planetData && (
          <View style={styles.planetContainer}>
            <Text style={styles.planetName}>{planetData.name}</Text>
            <Text style={styles.planetInfo}>{planetData.info}</Text>
            <TouchableOpacity style={styles.removeBtn} onPress={removePlanetData}>
              <Text style={styles.removeText}>Remove!</Text>
            </TouchableOpacity>
          </View>
        )}

       
        <FlatList
          data={Object.keys(planData)}
          horizontal
          keyExtractor={(plan) => plan}
          ItemSeparatorComponent={() => <View style={{ width:5 }} />}  
          contentContainerStyle={{ paddingHorizontal: 10 }}  
          renderItem={({ item: plan }) => (
            <View style={styles.slide}>
              <Text>{plan}</Text>
              <Pressable onPress={()=> ClickedPlanet(planData[plan].image)}>
                <Image source={planData[plan].image} style={styles.planImage} />
              </Pressable>
              <Text style={styles.planText}>{planData[plan].data}</Text>
            </View>
          )}
        />
     
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    Height:'100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#e6e6fa',
    textShadowColor: '#32127a',
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 1, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    color: '#e6e8fa',
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#e79fc4',
    borderRadius: 10,
    padding: 8,
  },
  searchIcon: {
    backgroundColor: '#d8bfd8',
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planetContainer: {
    width: '90%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  planetName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e6e6fa',
    textShadowColor: '#32127a',
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 1,
  },
  planetInfo: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(230, 232, 250, 0.25)',
  },
  removeBtn: {
    marginTop: 10,
    backgroundColor: '#d8bfd8',
    width: 80,
    height: 50,
  },
  removeText: {
    color: 'blue',
    marginTop: 10,
    marginLeft: 10,
  },
  slide: {
    marginTop:'10%',
    width: 250,
    Height:60,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e79fc4',
    borderRadius: 10,
    backgroundColor: 'rgba(230, 232, 250, 0.25)',
    alignItems: 'center',
  },
  planImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  planText: {
    color: '#e6e8fa',
  },
});
