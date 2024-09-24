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


    return (
            <View style={styles.container}>
              <ButtonWithIcon title="" iconName='images-outline' color='#0066FF' iconColor='white' width={50} height={50} onPress={pickImage} />
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
      borderWidth: 1,
      padding: 10,
      borderRadius: 7
    },
    image: {
      width: 250,
      height: 200,
      // marginLeft: 10,
      borderRadius: 7
    },
  });