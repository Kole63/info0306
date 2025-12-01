import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ModalScreen() {
  return (
    <>
      <Link href="/user" style={styles.link}>
        Fermer la modale
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 50,
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
  },
});