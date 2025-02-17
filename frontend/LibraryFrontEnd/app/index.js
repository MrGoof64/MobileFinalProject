import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Image, TextInput, Pressable} from 'react-native';
import Constants from "expo-constants/src/Constants";
import {Link} from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Home page of the app. Show every book in the library by default
export default function Page() {
  const [search, setSearch] = useState('');
  const [bookData, setBookData] = useState([])

  // On load this makes a call to the API and retrieves all of the book
  // data in the book.json file.
  // Reload books if search bar value changes after 1000 ms
  useEffect(() => {
    const getBookData = setTimeout(() => {
      const hostUri = Constants.expoConfig.hostUri
      const ipAddress = hostUri ? hostUri.split(":")[0] : null;
      const apiPort = "8080"

      const url = search ? `http://${ipAddress}:${apiPort}/book/name/${search}` : `http://${ipAddress}:${apiPort}/book/start`;
      const apiUrl = ipAddress ? url : null;

      fetch (apiUrl)
          .then(response => response.json())
          .then(data => setBookData(data))
          .catch(error => console.log(error));
    }, 1000)

    return () => search ? clearTimeout(getBookData) : getBookData;
  }, [search]);

  // This is what displays all the books
  return (
      <View style={styles.container}>

        {/*This container holds the search bar and filter button*/}
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

        {/*The flatlist runs through each book in the json file and displays them*/}
        <FlatList
            data={bookData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
                <View style={styles.bookContainer}>
                {/*This is neccesary to pass the book id to the book page*/}
                {/*    so that more information can be displayed*/}
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

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  bookContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
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
