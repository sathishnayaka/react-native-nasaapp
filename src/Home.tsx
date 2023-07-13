import axios from 'axios';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import NASA_API_KEY from '../config';

type formTypes = {
  navigation: any;
};

function Home({navigation}: formTypes): JSX.Element {
  const [text, setText] = useState('');
  const onPressSubmit = () => {
    navigation.navigate('asteriod-details', {
        asteriodId: text,
    });
  };

  const onChangeText = (val: string) => {
    setText(val);
  };

  const onRandamButtonClick = async() => {
    try{
        let x = Math.random() * 100;
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`)
        // const id = response.data.near_earth_objects[x].id;
        const length = (response.data.near_earth_objects.length);
        const randamNumber = Math.floor(Math.random() * (length - 0 + 1) + 0);
        const id = (response.data.near_earth_objects[randamNumber]["id"])
        navigation.navigate('asteriod-details', {
          asteriodId: id,
      });

    }catch(e){
      console.log(e);
    }
  }

  return (
    <SafeAreaView >
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Asteroid ID"
          data-testid="text-input"
        />
        <Button
          title="Submit"
          disabled={text === '' ? true : false}
          onPress={onPressSubmit}
          data-testid="submit-button"
        />
        <Button
          title="Random Asteroid"
          onPress={onRandamButtonClick}
          data-testid="random-button"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Home;
