import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from "expo-constants/src/Constants";
import {Link, useLocalSearchParams} from "expo-router";

// This page displays all of the book information and allows the user
// to check out the book
const Book = () => {

    // These constants are left out of the useEffect so that they can
    // also be used in the checkout method.
    const {id} = useLocalSearchParams()

    const [book, setBook] = useState(null)

    // I set the name to Aiden by default just to show that it works.
    // This username is passed to the checkout function so that the
    // data can be added to the users.json file
    const [userName, setUserName] = useState("Aiden")

    const hostUri = Constants.expoConfig.hostUri
    const ipAddress = hostUri ? hostUri.split(":")[0] : null;
    const apiPort = "8080"

    useEffect(() => {

        const apiBookUrl = ipAddress
            ? `http://${ipAddress}:${apiPort}/book/${id}`
            : null;

        fetch (apiBookUrl)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.log(error));
    }, []);

    // This method calls the checkoutBook function in the API. I defaulted the
    // userName here for testing purposes, and the id is taken from the book id
    // found in the local search parameters. This method is called on pressing
    // the checkout button
    const checkout = async () => {
        return await fetch(`http://${ipAddress}:${apiPort}/book/users/${userName}/userCheckout/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                {book && (
                    <>
                        <Link href="/" style={styles.back}>
                            ← Back
                        </Link>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{book.name}</Text>
                            <Text style={styles.author}>By {book.author}</Text>
                        </View>
                        <Image style={styles.image} source={{ uri: book.picture }} />
                        <Text style={styles.description}>{book.description}</Text>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.detail}><Text style={styles.label}>Genre:</Text> {book.genre}</Text>
                            <Text style={styles.detail}><Text style={styles.label}>Pages:</Text> {book.pages}</Text>
                            <Text style={styles.detail}><Text style={styles.label}>Publisher:</Text> {book.publisher}</Text>
                            <Text style={styles.detail}><Text style={styles.label}>Release Date:</Text> {book.releaseDate}</Text>
                        </View>
                    </>
                )}
                <TouchableOpacity style={styles.button} onPress={async () => await checkout()}>
                    <Text>Checkout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    topContainer: {
        backgroundColor: "red",
        paddingTop: 40,
        paddingBottom: 10,
    },
    back: {
        fontSize: 20,
        alignSelf: "flex-start",
        paddingBottom: 15,
    },
    titleContainer: {
        alignSelf: "flex-start",
        width: "100%",
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "left",
    },
    author: {
        fontSize: 16,
        color: "gray",
        textAlign: "left",
    },
    image: {
        width: 250,
        height: 350,
        marginVertical: 20,
    },
    description: {
        textAlign: "left",
        width: "90%",
    },
    detailsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    detail: {
        width: "48%",
        textAlign: "left",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
    },
    button: {
        backgroundColor: 'grey',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    }
});

export default Book;
