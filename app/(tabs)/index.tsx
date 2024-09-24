import { Button, Image, StyleSheet, Text, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ButtonWithIcon from '@/components/ButtonWithIcon';


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
        <ButtonWithIcon title="" color="red" onPress={() => deleteObstacle(id)} width={45} iconColor='white' iconName='close-circle-outline' />
      </View>
      <Text style={styles.description}>Description : {description}</Text>
      <Text style={styles.description}>Latitude : {coordoneX}</Text>
      <Text style={styles.description}>Longitude : {coordoneY}</Text>
      
      {img && <Image source={{ uri: img }} style={styles.image} />}
    </View>
  );
  

  return (
    <View style={styles.container}>
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
    marginTop: 30,
  },
  item: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    gap: 10
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 30,
  },
  description: {
    fontSize: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});
