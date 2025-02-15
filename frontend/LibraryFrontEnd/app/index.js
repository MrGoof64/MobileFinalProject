import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Image, TextInput, Pressable} from 'react-native';
import Constants from "expo-constants/src/Constants";
import {Link} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Page() {
  const [search, setSearch] = useState('');
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    const hostUri = Constants.expoConfig.hostUri
    const ipAddress = hostUri ? hostUri.split(":")[0] : null;
    const apiPort = "8080"

    const apiUrl = ipAddress
        ? `http://${ipAddress}:${apiPort}/book/start`
        : null;

    fetch (apiUrl)
        .then(response => response.json())
        .then(data => setBookData(data))
        .catch(error => console.log(error));
  }, []);

  return (
      <View style={styles.container}>

        <View style={styles.searchBar}>
          <TextInput
              style={styles.input}
              value={search}
              onChangeText={setSearch}
          />
          <Pressable onPress={() => {}}>
            <FontAwesome5 name="filter" size={24} color="black" />
          </Pressable>
        </View>


        <FlatList
            data={bookData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Two books per row
            columnWrapperStyle={styles.row} // Styling for row spacing
            renderItem={({ item }) => (
                <View style={styles.bookContainer}>
                  <Link href={`/book/${item.id}`}>
                    <Image
                        style={styles.image}
                        source={{
                          uri: item.picture,
                        }}
                    />
                  </Link>
                </View>
            )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    justifyContent: "space-between", // Ensures spacing between columns
  },
  bookContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10, // Space between rows
  },
  image: {
    width: 150,
    height: 215,
    borderRadius: 8,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    width: "90%",
  }
});
