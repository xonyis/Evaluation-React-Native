import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ButtonWithIcon({onPress, title, iconName, color, iconColor, width, height}) {

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color, width: width, height: height}]} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Ionicons name={iconName} size={30} color={iconColor} style={styles.icon} />
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
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
    buttonContent: {
      flexDirection: 'row', // Mettre l'icône et le texte côte à côte
      alignItems: 'center',
    },
    icon: {

    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });