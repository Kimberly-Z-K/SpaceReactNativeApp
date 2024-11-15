import React from 'react';
import {createContext,useState} from 'react';

const PlanetContext=createContext();

const PlanetProvider=({children})=>{
    
const[planData,setPlanData]=useState({

    Mercury:{data:'Closest to the Sun: Mercury is the closest planet to the Sun and has the shortest orbit, taking just 88 Earth days to complete one revolution.Extreme Temperatures: It experiences extreme temperature fluctuations, ranging from about -173°C (-280°F) at night to 427°C (800°F) during the day.',
        image:  require('./assets/Spinning_Mercury__Nasa_reveal_stunning_animation_showing_giant_craters_on_the_planet_s_surface-removebg-preview.png'),
  },

  Earth:{
     data: 'Only Known Planet with Life: Earth is the only planet known to support life, thanks to its perfect distance from the Sun, which allows for liquid water and a breathable atmosphere.Active Geology: Earth is geologically active with tectonic plates that cause earthquakes, volcanic eruptions, and the formation of mountains.',
     image: require('./assets/Illustrating_Environmental_Awareness__Cartoon_3D_Earth_Icon-removebg-preview.png'),
  },

 Mars:{
     data: 'Red Planet: Mars is known as the "Red Planet" due to iron oxide (rust) on its surface, giving it a reddish appearance.Largest Volcano: Mars is home to Olympus Mons, the largest volcano in the solar system, standing about 13.6 miles (22 kilometers) high, nearly three times the height of Mount Everest.',
     image: require('./assets/Mars-removebg-preview.png'),
 },

 Saturn:{
     data: 'Famous Rings: Saturn is famous for its stunning rings, which are made primarily of ice particles, rocky debris, and dust.Low Density: Saturn is the least dense planet; it could float in water because its density is lower than that of liquid water.',
     image: require('./assets/Saturn_and_its_rings-removebg-preview.png'),
 },

 Venus:{
     data: 'Hottest Planet: Despite not being the closest to the Sun, Venus is the hottest planet in our solar system, with surface temperatures around 465°C (869°F) due to a thick atmosphere rich in carbon dioxide, creating a runaway greenhouse effect.Retrograde Rotation: Venus has a unique rotation, spinning backward on its axis (retrograde rotation), which means the Sun rises in the west and sets in the east.',
     image: require('./assets/Venus_stock_illustration__Illustration_of_rotate__astrology_-_10158221-removebg-preview.png'),
 }
 
});



return(<PlanetContext.Provider value={{planData,setPlanData}}>
    {children}
</PlanetContext.Provider>
);
};
export {PlanetProvider,PlanetContext};