import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function CameraRoll(props) {
  const assetId = React.useRef();

  const [albums, setAlbums] = React.useState([]);
  const [
    { assets, endCursor, hasNextPage, totalCount },
    setAssets
  ] = React.useState({ assets: [], totalCount: 0 });

  React.useEffect(() => {
    MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true }).then(setAlbums);
  }, []);

  const onSelectAlbum = ({ id }) => {
    assetId.current = id;
    MediaLibrary.getAssetsAsync({ album: id, first: 10 }).then(setAssets);
  };

  return (
    <View style={styles.container}>
      <AlbumList albums={albums} onSelectAlbum={onSelectAlbum} />
      <Text>{`assets.totalCount ${totalCount}`}</Text>
      <AssetList assets={assets} navigation={props.navigation} />
    </View>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CameraRoll);

const { width } = Dimensions.get("window");

const AssetSize = width / 4;
const AlbumSize = width / 3;

const Album = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.album}>
      <Text>{item.title}</Text>
      <Text>album.assetCount: {item.assetCount}</Text>
    </View>
  </TouchableOpacity>
);

const AlbumList = ({ albums, onSelectAlbum }) => (
  <View>
    <FlatList
      data={albums}
      horizontal
      keyExtractor={item => item.id}
      renderItem={props => <Album {...props} onPress={onSelectAlbum} />}
    />
  </View>
);

const AssetList = ({ assets, navigation }) => (
  <FlatList
    data={assets}
    numColumns={4}
    keyExtractor={item => item.id}
    renderItem={({ item: { uri } }) => (
      <TouchableHighlight
        onPress={() => {
          alert(uri);
          navigation.navigate("Submit", { uri: uri });
        }}
      >
        <Image source={{ uri }} style={styles.asset} />
      </TouchableHighlight>
    )}
  />
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  album: {
    backgroundColor: "#ccc",
    borderColor: "#aaa",
    borderWidth: 1,
    height: AlbumSize,
    width: AlbumSize,
    margin: 2,
    padding: 2
  },
  asset: {
    height: AssetSize,
    width: AssetSize
  }
});
