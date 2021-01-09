import React from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Badge } from "react-native-elements";

const GalleryScreen = (props) => {
  return (
    <ScrollView
      style={{ flex: 1, marginBottom: 10 }}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>{"Photos de " + props.pseudo}</Text>
      {props.data.map((dataImage, i) => {
        let barbe = "pas de barbe !";
        if (dataImage.facialHair) {
          barbe = "barbe !";
        }
        let makeup = "pas maquillé";
        if (dataImage.makeup) {
          makeup = "maquillé";
        }
        return (
          <Card key={i} containerStyle={{ width: "90%", padding: 0 }}>
            <Image style={styles.image} source={{ uri: dataImage.url }} />
            <View style={{ marginVertical: 10 }}>
              <Badge
                badgeStyle={styles.badge}
                value={dataImage.gender}
                status="success"
              />
              <Badge
                badgeStyle={styles.badge}
                value={dataImage.age + " ans"}
                status="success"
              />
              <Badge badgeStyle={styles.badge} value={barbe} status="success" />
              <Badge
                badgeStyle={styles.badge}
                value={dataImage.emotion + " !"}
                status="success"
              />
              <Badge
                badgeStyle={styles.badge}
                value={makeup}
                status="success"
              />

              <Badge
                badgeStyle={styles.badge}
                value={dataImage.hair}
                status="success"
              />
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f1faee",
    minHeight: "100%",
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 35,
  },
  image: {
    width: "100%",
    height: 220,
  },
  badge: {
    marginVertical: 1,
    height: 20,
    paddingHorizontal: 15,
  },
});

function mapStateToProps(state) {
  // console.log(state.data);
  return { data: state.data, pseudo: state.Userpseudo };
}

export default connect(mapStateToProps, null)(GalleryScreen);
