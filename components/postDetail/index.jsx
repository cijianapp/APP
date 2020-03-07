import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import { baseURL, ossURL } from "../../utils/http";
import { timeDiff } from "../../utils/calc";
import { themeLight } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";

function PostDetail(props) {
  const [post, setPost] = useState({});

  const navigation = useNavigation();

  navigation.setOptions({ headerShown: false });

  let avatarURL = "";
  if (post.useravatar !== "") {
    avatarURL = ossURL + post.useravatar;
  }
  let time = timeDiff(post.time);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getConfig = {
      params: { post: props.route.params.post_id },
      cancelToken: source.token
    };

    axios
      .get(baseURL + "guest/post", getConfig)
      .then(response => {
        setPost(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, []);

  let content = [];

  if (Array.isArray(post.content)) {
    post.content.forEach((element, index) => {
      if (element.type === "paragraph") {
        content.push(
          <Text key={index} style={styles.text}>
            {element.children[0].text}
          </Text>
        );
      }
      if (element.type === "image") {
        content.push(
          <Image
            key={index}
            style={{
              width: "100%",
              aspectRatio: 1,
              resizeMode: "cover"
            }}
            source={{
              uri: element.url
            }}
          ></Image>
        );
      }
    });
  }

  return (
    <ScrollView>
      {/* <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      ></StatusBar> */}
      <View style={styles.container}>
        <View style={styles.infoWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatarURL
            }}
          ></Image>

          <View style={styles.userInfo}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.timeInfo}>
              {time}
              {"   "}
              {post.channelname}
            </Text>
          </View>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{post.title}</Text>
        </View>

        {content}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 20,
    backgroundColor: themeLight.cardBackground,
    elevation: 1,
    alignContent: "center"
  },

  infoWrapper: {
    flex: 1,
    flexDirection: "row",
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
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },

  title: {
    fontSize: 16,
    fontWeight: "bold"
  },

  text: {
    fontSize: 14
  }
});
