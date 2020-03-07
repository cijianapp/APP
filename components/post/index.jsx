import React, { useState, useEffect, memo, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ossURL } from "../../utils/http";
import { themeLight } from "../../utils/theme";
import { timeDiff } from "../../utils/calc";

export const Post = React.memo(function Post(props) {
  const navigation = useNavigation();

  let text = "";
  let imgURL = "";
  let videoURL = "";
  let avatarURL = "";
  let time = timeDiff(props.post.time);

  if (props.post.useravatar !== "") {
    avatarURL = ossURL + props.post.useravatar;
  }

  let postType = "normal";

  if (Array.isArray(props.post.content))
    props.post.content.forEach(node => {
      if (node.type === "paragraph") {
        if (text === "" && node.children[0].hasOwnProperty("text")) {
          text = node.children[0].text;
        }
        if (imgURL === "" && node.children[0].type === "image") {
          imgURL = node.children[0].url;
        }
      }
      if (node.type === "image") {
        if (imgURL === "") {
          imgURL = node.url;
        }
      }

      if (node.type === "video") {
        if (videoURL === "") {
          videoURL = node.url;
          postType = "video";
        }
      }
    });

  const [imageRatio, setImageRatio] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    if (imgURL !== "") {
      Image.getSize(
        imgURL,
        (width, height) => {
          if (!isCancelled) {
            setImageRatio(width / height);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("PostDetail", { post_id: props.post._id });
      }}
    >
      <View style={styles.container}>
        <View style={styles.infoWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatarURL
            }}
          ></Image>

          <View style={styles.userInfo}>
            <Text style={styles.username}>{props.post.username}</Text>
            <Text style={styles.timeInfo}>
              {time}
              {"   "}
              {props.post.channelname}
            </Text>
          </View>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{props.post.title}</Text>
        </View>

        {imgURL !== "" ? (
          <View style={styles.media}>
            <Image
              style={{
                width: "100%",
                aspectRatio: imageRatio,
                resizeMode: "cover"
              }}
              source={{
                uri: imgURL
              }}
            ></Image>
          </View>
        ) : (
          <View style={styles.textWrapper}>
            <Text>{text}</Text>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
});

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
    backgroundColor: themeLight.cardBackground,
    elevation: 1,
    alignContent: "center"
  },

  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16
  },

  userInfo: { marginLeft: 5 },

  username: { fontSize: 14, fontWeight: "bold", lineHeight: 18 },

  timeInfo: { fontSize: 12, fontWeight: "normal", lineHeight: 14 },

  textWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },

  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  media: {
    maxHeight: 500,
    overflow: "hidden"
  }
});
