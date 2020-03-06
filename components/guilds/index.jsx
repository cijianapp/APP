import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import { baseURL } from "../../utils/http";
import { themeLight } from "../../utils/theme";
import { USER_INFO } from "../../redux/actions";

import Guild from "./guild";
import Channels from "./channels";

function Guilds(props) {
  useEffect(() => {
    const source = axios.CancelToken.source();

    if (props.login) {
      if (!props.info.hasOwnProperty("username")) {
        axios
          .get(baseURL + "api/info", {
            ...props.headerConfig,
            cancelToken: source.token
          })
          .then(response => {
            props.setUserInfo(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    return () => {
      source.cancel();
    };
  }, [props.login, props.headerConfig]);

  let guildList = [];
  let guildElement = {};
  let guildName = "";
  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(guild => {
      guildList.push(guild);

      if (props.route.params !== undefined) {
        if (guild._id === props.route.params.guild_id) {
          guildName = guild.name;
          guildElement = guild;
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.guilds}>
        <FlatList
          data={guildList}
          renderItem={({ item }) => <Guild guild={item} />}
          keyExtractor={item => item._id}
        ></FlatList>
      </View>
      <View style={styles.channels}>
        <View style={styles.title}>
          <Text style={styles.guildName}>{guildName}</Text>
          <Ionicons name="md-menu" size={24} color={"black"} />
        </View>

        <Channels guild={guildElement}></Channels>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  login: state.auth.login,
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => {
    dispatch({ type: USER_INFO, value: info });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Guilds);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  guilds: {
    width: 72,
    paddingTop: 30,
    backgroundColor: themeLight.backgroundPrimary
  },
  channels: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: themeLight.backgroundSecondary
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 32,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  guildName: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
