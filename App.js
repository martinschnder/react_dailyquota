import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  MaterialIcons,
} from "react-native";

export default function App() {
  const [Quote, setQuote] = useState("Loading...");
  const [Author, setAuthor] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  const getQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        setQuote(result.content);
        setAuthor(result.author);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.quoteContainer}>
        <View style={styles.titleContainer}>
          <Text styles={styles.title}>Daily Quote</Text>
        </View>
        <Text style={styles.quote}>{Quote}</Text>
        <Text style={styles.author}>- {Author}</Text>
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={getQuote}>
        {/* <MaterialIcons name="fitness-center" color="#333" size={25} /> */}
        <Text>{isLoading ? "Loading..." : "New Quote"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  author: {
    position: "absolute",
    bottom: 10,
    right: 20,
    color: "#000",
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#5e548e",
    alignItems: "center",
    justifyContent: "center",
  },
  quote: {
    margin: 15,
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  quoteContainer: {
    margin: 20,
    width: "80%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  refreshButton: {
    margin: 20,
    width: 140,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#e0b1cb",
  },
  title: { color: "white" },
  titleContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "#9f86c0",
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
