import React from "react";
import { View, TouchableHighlight, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { themeLight } from "../../utils/theme";
import { ossURL } from "../../utils/http";

function Guild(props) {
  const navigation = useNavigation();

  const imgUrl = ossURL + props.guild.avatar;

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("Guilds", { guild_id: props.guild._id });
      }}
    >
      <View style={styles.itemWrapper}>
        <View style={styles.circleIconButton}>
          <Image style={styles.icon} source={{ uri: imgUrl }}></Image>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Guild);

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: "row",
    height: 64,
    width: 72,
    justifyContent: "center",
    alignItems: "center"
  },
  circleIconButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: themeLight.backgroundSecondary,
    overflow: "hidden"
  },
  icon: {
    height: 48,
    width: 48,
    resizeMode: "cover"
  }
});
