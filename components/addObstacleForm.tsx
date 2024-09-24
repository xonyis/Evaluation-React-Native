import { Image, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import  React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function addObstacleForm() {
    const [text, onChangeText] = useState('');
    const [textDescription, setTextDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const obstacle = {
        id: Date.now(), 
        name: text,
        description: textDescription,
        img: imgUrl,
        coordoneY: parseFloat(longitude),
        coordoneX: parseFloat(latitude),

    }
  const submitObstacle = async () => {
    try {
      const storedObstacles = await AsyncStorage.getItem('STORAGE_KEY');
      const obstacles = storedObstacles ? JSON.parse(storedObstacles) : [];
      obstacles.push(obstacle);

      await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(obstacles));
      // alert(`Data successfully saved ${typeof obstacle.id}`,)
      alert(`Data successfully saved`,)

      
      onChangeText('');
      setTextDescription('');
      setImgUrl('');
      setLatitude('')
      setLongitude('')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  };


  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Nom de l'obstacle"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTextDescription}
        value={textDescription}
        placeholder="Description de l'obstacle"
      />
      <TextInput
        style={styles.input}
        onChangeText={setImgUrl}
        value={imgUrl}
        placeholder="Url de l'image"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLatitude}
        value={latitude}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLongitude}
        value={longitude}
        placeholder="Longitude"
        keyboardType="numeric"
      />

      <Button
        onPress={submitObstacle}
        title="Ajouter"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});