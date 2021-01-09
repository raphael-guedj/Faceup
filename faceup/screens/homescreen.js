import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation, setPseudoRedux }) => {
  const [pseudo, setPseudo] = useState("");

  const handleSubmitPseudo = () => {
    setPseudoRedux(pseudo);
  };

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.image_hero}
    >
      <View style={styles.container}>
        <Input
          placeholder="Your Name"
          onChangeText={(e) => setPseudo(e)}
          value={pseudo}
          placeholderTextColor="#2a9d8f"
          leftIcon={<Ionicons name="md-person" size={30} color="#2a9d8f" />}
          leftIconContainerStyle={{
            marginHorizontal: 5,
          }}
          inputStyle={{
            color: "#212529",
            fontSize: 22,
          }}
          inputContainerStyle={{
            borderBottomColor: "#2a9d8f",
          }}
        />
        <Button
          buttonStyle={styles.button}
          title="Go to Gallery"
          titleStyle={{
            fontSize: 18,
            color: "#ececec",
            padding: 5,
          }}
          onPress={() => {
            navigation.navigate("Gallery");
            handleSubmitPseudo();
            setPseudo("");
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 65,
  },
  image_hero: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2a9d8f",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setPseudoRedux: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo });
      console.log("dispatch", pseudo);
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
