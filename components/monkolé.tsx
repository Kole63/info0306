import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';
import TextMain from './TextMain';


export default function KoleScreen() {
  const router = useRouter();
  const nav = ()=>{
    router.push('./point');
  }
  return (
    <View style={styles.container}>
      <TextMain style={styles.title} label="" unit="">📚 Page Kolé: Description</TextMain>
      <TextMain label="" unit="">
      Bonjour je m'appelle Kolé et je suis étudiant en deuxième année d'informatique à l'université. J'adore apprendre de nouvelles technologies et travailler sur des projets innovants. En dehors de mes études, je suis passionné par la musique et le sport. J'aime aussi voyager et découvrir de nouvelles cultures.
      Et je suis à la recherche d'un stage dans le domaine de l'informatique pour mettre en pratique mes compétences et acquérir de l'expérience professionnelle.
      </TextMain>
      <Button title="test" onPress={nav}/>
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    position: 'relative', 
    top: 20,
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    //se positionner au dessus de la barre de navigation
    position: 'absolute',
    top: 0,
    left: 2,
    right: 2,
  },
});