import useUser from "@/hooks/useUSER";
import React from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Button } from "react-native";
export default function User() {
  const { name, setName, users, addUser, deleteUser } = useUser();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Ajouter un utilisateur" onPress={addUser} />

      <FlatList
        data={users}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text>
            <Button title="Supprimer" onPress={() => deleteUser(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Aucun utilisateur</Text>}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  list: {
    marginTop: 12,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  empty: {
    color: '#666',
    fontStyle: 'italic',
  },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
});