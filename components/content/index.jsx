import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import { baseURL } from "../../utils/http";
import Post from "../post";

function Content(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(baseURL + "guest/posts", {
        ...props.headerConfig,
        cancelToken: source.token,
        params: {
          guild: props.route.params.guild_id,
          channel: props.route.params.channel_id
        }
      })
      .then(response => {
        if (response.data !== null) {
          let postList = [];
          response.data.forEach(element => {
            postList.push(element);
          });
          setPosts(postList);
        }
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, [props.route.params.channel_id, props.headerConfig]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={item => item._id}
      ></FlatList>
    </View>
  );
}

const mapStateToProps = state => ({
  login: state.auth.login,
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
