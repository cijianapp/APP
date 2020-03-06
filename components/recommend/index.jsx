import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import { baseURL } from "../../utils/http";
import Post from "../post";

function Recommend(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(baseURL + "guest/homeposts", {
        cancelToken: source.token
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
  }, []);

  return (
    <View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
