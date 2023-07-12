import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type formTypes = {
  navigation: any;
  route: any;
};

const AsteriodDetails = ({navigation, route}: formTypes) => {
  const [name, setName] = useState('');
  const [nasaJplUrl, setNasaJplUrl] = useState('');
  const [isAzardous, setIsAzardous] = useState('');

  const {asteriodId} = route.params;
  console.log(asteriodId);

  const getWeatherDetails = async () => {
    try{
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteriodId}?api_key=Nx4FmtPcWVyvx4Hutzdgx40jH6gITruek55ccTCG`);
    console.log(response.data);
    setNasaJplUrl(response.data.nasa_jpl_url);
    setName(response.data.name);
    setIsAzardous(response.data.is_potentially_hazardous_asteroid);
    }catch(e){
      navigation.goBack();
    }
  };

  useEffect(() => {
      getWeatherDetails();
  }, [asteriodId]);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <ImageBackground
        source={{
          uri: 'https://th.bing.com/th/id/R.37a7f95269ecbb523c7dbc0708cf14f6?rik=WPjoXHSKtcZDVQ&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f80%2f54%2fdeIb7w.jpg&ehk=woxJ8P36LgJ9IacG3Z77Yyn%2f2AM23AuCrDnvXnR1lXI%3d&risl=&pid=ImgRaw&r=0',
        }}
        resizeMode="cover"
        style={styles.image}>
        <Text data-testid="capital" style={styles.temp}>
          Name : {name}
        </Text>
        <Text data-testid="temp"  style={styles.capitalText}>
          Nasa JPL URL : {nasaJplUrl}{' '}
        </Text>
        <Text style={{color: '#fff', fontSize: 20}}>
          is potentially hazardous asteroid : {isAzardous ? "YES" : "No"}
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  image: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capitalText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center',
  },
  temp: {
    fontSize: 36,
    lineHeight: 50,
    fontWeight: '800',
    color: 'orange',
  },
});

export default AsteriodDetails;
