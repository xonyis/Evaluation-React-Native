import { Image, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import React from 'react';
import AddObstacleForm from '@/components/addObstacleForm';



export default function AddScreen() {

  return (
    <View>
      <AddObstacleForm />
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