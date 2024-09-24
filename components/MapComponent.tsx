import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type MapProps = {
  latitude: number;
  longitude: number;
};

export default function MapComponent({ latitude, longitude }: MapProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude, // Utiliser les coordonnées
          longitude: longitude,
          latitudeDelta: 0.0922, // Ajuster la zone visible
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marqueur sur la carte */}
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={"Localisation de l'obstacle"}
          description={"Ceci est l'endroit de l'obstacle"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
