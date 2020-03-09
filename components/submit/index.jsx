import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

function Submit(props) {
  const [assets, setAssets] = React.useState([]);

  useEffect(() => {
    if (props.route.params !== undefined) {
      const assetList = JSON.parse(JSON.stringify(assets));
      assetList.push(props.route.params);
      setAssets(assetList);
    }
  }, [props.route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          placeholder="说点感兴趣的事吧..."
          autoFocus
          multiline
          style={{
            alignContent: "flex-start",
            margin: 10
          }}
        ></TextInput>
      </View>

      <View>
        <AssetList assets={assets} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableHighlight
          onPress={() => {
            props.navigation.navigate("CameraRoll");
          }}
        >
          <Ionicons
            name={"md-images"}
            size={24}
            style={{ padding: 10 }}
          ></Ionicons>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);

const { width } = Dimensions.get("window");

const AssetSize = width / 4;
const AlbumSize = width / 3;

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  imageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  asset: {
    height: AssetSize,
    width: AssetSize
  }
});

const AssetList = ({ assets }) => (
  <FlatList
    data={assets}
    numColumns={4}
    keyExtractor={item => item.id}
    renderItem={({ item: { uri } }) => (
      <Image source={{ uri }} style={styles.asset} />
    )}
  />
);
