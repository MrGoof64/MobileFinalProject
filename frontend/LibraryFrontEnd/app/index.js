import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import Constants from "expo-constants/src/Constants";
import {Link} from "expo-router";

// Home page of the app. Show every book in the library by default
export default function Page() {

  const [bookData, setBookData] = useState([])

  // On load this makes a call to the API and retrieves all of the book
  // data in the book.json file
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

  // This is what displays all the books
  return (
      <View style={styles.container}>
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
});
