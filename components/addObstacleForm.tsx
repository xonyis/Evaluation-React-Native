import { Image, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import  React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonWithIcon from './ButtonWithIcon';
import ImagePickerComponent from './ImagePickerComponent'

export default function addObstacleForm() {
    const [text, onChangeText] = useState('');
    const [textDescription, setTextDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [resetImageFlag, setResetImageFlag] = useState(false);  // Flag pour réinitialiser l'image

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

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());

    } catch (error) {
      alert('Impossible de récupérer la localisation');
      console.error(error);
      
    }
  };

  const resetLongLat = () => {
    setLatitude('')
    setLongitude('')
  }

  const reset = () => {
    onChangeText('');
    setTextDescription('');
    setImgUrl('');
    setLatitude('')
    setLongitude('')
  }

  

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Ajouter un Obstacle</Text>

      <Text style={[styles.label, {marginTop: 30}]}>Nom de l'obstacle :</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Nom de l'obstacle"
      />
      
      <Text style={styles.label}>Description de l'obstacle :</Text>

      <TextInput
        style={styles.input}
        onChangeText={setTextDescription}
        value={textDescription}
        placeholder="Description de l'obstacle"
      />

      <View style={styles.locationContainer}>

      <View style={[{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginBottom: 10}]}>
      <Text style={styles.label}>Ajouter un Obstacle :</Text>
        <View style={[{display: 'flex', flexDirection: 'row', gap: 10}]}>
        <ButtonWithIcon 
          onPress={getCurrentLocation} 
          iconName="navigate-circle-outline" 
          color='#0066FF'
          iconColor='white'
          width={50}
          title=''
        />
        <ButtonWithIcon 
          onPress={resetLongLat} 
          iconName="close-circle-outline" 
          color='#e63946'
          iconColor='white'
          width={50}
          title=""
        />
        </View>
      </View>
      

      <View style={styles.inputLocationContainer}>
      <TextInput
        style={styles.inputLocation}
        onChangeText={setLatitude}
        value={latitude}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputLocation}
        onChangeText={setLongitude}
        value={longitude}
        placeholder="Longitude"
        keyboardType="numeric"
      />
      
      </View>
      </View>
        
      <ImagePickerComponent onImagePicked={setImgUrl} />
      
      <View style={[{marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}]}>
      <ButtonWithIcon 
          
          onPress={submitObstacle} 
          iconName="add-circle-outline" 
          color='#0066FF'
          iconColor='white'
          width={150}
          title="Ajouter"
        />
       
       <ButtonWithIcon 
          
          onPress={reset} 
          iconName="close-circle-outline" 
          color='#e63946'
          iconColor='white'
          width={150}
          title="Reset"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 50,
    padding: 20
  },
  locationContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 10
  },
  inputLocationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  label: {
    fontSize: 18
  },
  input: {
    marginTop: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#6e6e6e',
    padding: 10,
    borderRadius: 7
  },
  inputLocation: {
    marginTop: 10,
    height: 40,
    width: '45%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#6e6e6e',
    padding: 10,
    borderRadius: 7
  },
  btnSubmit:{
    backgroundColor: 'red'
  }
});