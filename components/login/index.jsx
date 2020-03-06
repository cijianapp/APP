import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import { baseURL } from "../../utils/http";
import { themeLight } from "../../utils/theme";

import { SET_TOKEN, LOGIN } from "../../redux/actions";

function Login(props) {
  const [tel, setTel] = useState("117");
  const [password, setPassword] = useState("zxcvbnm");

  function login() {
    const loginParams = {
      tel: tel,
      password: password
    };

    axios
      .post(baseURL + "auth/login", loginParams)
      .then(function(response) {
        if (response.data.code === 200) {
          props.setToken(response.data.token);
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
      <Text style={{ ...styles.title, color: themeLight.headerPrimary }}>
        欢迎回来
      </Text>
      <Text style={{ ...styles.lead, color: themeLight.headerSecondary }}>
        此间千面，全都是你
      </Text>
      <View style={styles.formContainer}>
        <Text>手机号</Text>
        <TextInput
          style={styles.inputContainer}
          autoCompleteType="tel"
          textContentType="telephoneNumber"
          value={tel}
          onChangeText={text => setTel(text)}
        ></TextInput>
        <Text>密码</Text>
        <TextInput
          style={styles.inputContainer}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        ></TextInput>

        <Button title="登录" onPress={login}></Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = state => ({ login: state.auth.login });

const mapDispatchToProps = dispatch => ({
  setToken: token => {
    dispatch({
      type: LOGIN
    });
    dispatch({
      type: SET_TOKEN,
      value: token
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold"
  },

  lead: {
    marginTop: 10,
    fontSize: 20
  },

  formContainer: {
    margin: 30,
    marginBottom: 60,
    alignSelf: "stretch"
  },

  inputContainer: {
    marginBottom: 10
  }
});
