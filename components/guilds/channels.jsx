import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Channels(props) {
  let postList = [];
  let chatList = [];

  if (Array.isArray(props.guild.channel)) {
    props.guild.channel.forEach(channel => {
      if (channel.type === "post") {
        postList.push(
          <Channel
            key={channel._id}
            guild_id={props.guild._id}
            channel={channel}
          ></Channel>
        );
      }

      if (channel.type === "chat") {
        chatList.push(
          <Channel
            key={channel._id}
            guild_id={props.guild._id}
            channel={channel}
          ></Channel>
        );
      }
    });
  }

  return (
    <ScrollView>
      <Category name="版面频道"></Category>
      {postList}

      <Category name="聊天频道"></Category>
      {chatList}
    </ScrollView>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);

function Channel(props) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("Content", {
          guild_id: props.guild_id,
          channel_id: props.channel._id
        });
      }}
    >
      <View style={styles.channel}>
        <Text style={styles.channelName}> {props.channel.name} </Text>
      </View>
    </TouchableHighlight>
  );
}

function Category({ name }) {
  return (
    <View style={styles.category}>
      <Ionicons
        style={styles.icon}
        name="ios-arrow-down"
        size={18}
        color={"black"}
      />
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  channel: { padding: 5, paddingLeft: 20 },
  channelName: { fontSize: 16 },
  category: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center"
  },
  icon: {
    padding: 5
  }
});
