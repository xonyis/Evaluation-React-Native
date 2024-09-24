import React from 'react';
import { useState, useEffect } from 'react';
import { Image, Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ButtonWithIcon from './ButtonWithIcon';

export default function ImagePickerComponent({ onImagePicked, resetImage }: { onImagePicked: (uri: string) => void, resetImage: boolean  }) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImage(uri);
      onImagePicked(uri);
      
    }
  };

  useEffect(() => {
    if (resetImage) {
      setImage(null);
      onImagePicked('')
    }
  }, [resetImage]);

  const resetImg = () => {
    setImage(null);
      onImagePicked('')
  }

    return (
            <View style={styles.container}>
              <View style={[{gap: 10, display: 'flex', justifyContent: 'space-between'}]}>
                <ButtonWithIcon title="" iconName='images-outline' color='#0066FF' iconColor='white' width={50} height={50} onPress={pickImage} />
                <ButtonWithIcon 
          onPress={resetImg} 
          iconName="close-circle-outline" 
          color='#e63946'
          iconColor='white'
          width={50}
          height={50}
          title=""
        />              
        </View>

              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#841584',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderRadius: 7,
      backgroundColor: 'white',
      shadowColor: 'rgba(100, 100, 111, 0.2)', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 7 }, // Décalage de l'ombre
    shadowOpacity: 1, // Opacité de l'ombre
    shadowRadius: 9.51,
    },
    image: {
      width: 250,
      height: 200,
      // marginLeft: 10,
      borderRadius: 7
    },
  });