import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import Constants from "expo-constants/src/Constants";
import {Link} from "expo-router";

export default function Page() {

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
        <FlatList
            data={bookData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
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
