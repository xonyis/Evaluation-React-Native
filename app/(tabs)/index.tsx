import { Button, Image, StyleSheet, Text, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import MapComponent from '@/components/MapComponent';

type Obstacle = {
  id: number;
  name: string;
  description: string;
  img?: string; // '?' indique que l'image est optionnelle
  coordoneY?: string;
  coordoneX?: string;
};



export default function HomeScreen() {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]); 

  useFocusEffect(
    React.useCallback(() => {
    // Fonction pour récupérer les obstacles stockés dans AsyncStorage
    const getObstacles = async () => {
      try {
        const storedObstacles = await AsyncStorage.getItem('STORAGE_KEY');
        if (storedObstacles != null) {
          setObstacles(JSON.parse(storedObstacles)); // Convertir en tableau d'obstacles
        }
      } catch (e) {
        console.log('Erreur lors de la récupération des données : ', e);
      }
    };

    getObstacles();
  }, []));

  const deleteObstacle = async (id: number) => {
    const filteredObstacles = obstacles.filter(obstacle => obstacle.id !== id);
    setObstacles(filteredObstacles);
    try {
      await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(filteredObstacles));
      console.log('Obstacle supprimé avec succès.');
    } catch (e) {
      console.log('Erreur lors de la suppression de l\'obstacle : ', e);
    }
  }

  
  // type ItemProps = {id: number, name: string, description : string, img: string};
  type ItemProps = {obstacle: object};


  const Item = ({ name, description, img, id, coordoneY, coordoneX }: Obstacle) => (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>Obstacle : {name}</Text>
        <ButtonWithIcon title="" color="" onPress={() => deleteObstacle(id)} width={45} iconColor='#e63946' iconName='close-circle-outline' />
      </View>
      <View style={styles.imgDescContainer}>
        {img && <Image source={{ uri: img }} style={styles.image} />}

        {description && <Text style={styles.description}>Description : {description}</Text>}
      </View>
      

      { coordoneY && coordoneX && (
          <MapComponent latitude={coordoneX} longitude={coordoneY} />
        )}
    </View>
  );
  

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Liste d'Obstacles</Text>

      {obstacles.length > 0 ? (
        <FlatList
          data={obstacles}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              description={item.description}
              img={item.img}
              id={item.id}
              coordoneY={item.coordoneY}
              coordoneX={item.coordoneX}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Aucun obstacle enregistré</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  item: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    gap: 10,
    backgroundColor: 'white',
    shadowColor: 'rgba(100, 100, 111, 0.2)', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 7 }, // Décalage de l'ombre
    shadowOpacity: 1, // Opacité de l'ombre
    shadowRadius: 9.51,
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -10
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  imgDescContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  description: {
    fontSize: 17,
    marginTop: 7,
    flexShrink: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
  
});
