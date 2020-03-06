import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import Homepage from "./components/homepage";
import Recommend from "./components/recommend";
import PostDetail from "./components/postDetail";
import Guilds from "./components/guilds";
import Content from "./components/content";

import { Provider } from "react-redux";
import store from "./redux/store";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const HomeTab = createMaterialTopTabNavigator();
const GuildsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeTabScreen}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
      <HomeStack.Screen name="Post" component={PostDetail}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function HomeTabScreen() {
  return (
    <HomeTab.Navigator
      options={{ showLabel: false }}
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        tabStyle: { marginTop: 30 }
      }}
    >
      <HomeTab.Screen name="Home" component={Homepage} />
      <HomeTab.Screen name="Recommend" component={Recommend} />
    </HomeTab.Navigator>
  );
}

function GuildsStackScreen() {
  return (
    <GuildsStack.Navigator initialRouteName="Guilds">
      <GuildsStack.Screen
        name="Guilds"
        component={Guilds}
        options={{ headerShown: false }}
      ></GuildsStack.Screen>
      <GuildsStack.Screen
        name="Content"
        component={Content}
      ></GuildsStack.Screen>
    </GuildsStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // tabBarVisible: getHeaderTitle(route),
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "md-home";
              } else if (route.name === "Guilds") {
                iconName = "md-apps";
              } else if (route.name === "Talking") {
                iconName = "md-chatboxes";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={24} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Guilds" component={GuildsStackScreen} />
          <Tab.Screen name="Talking" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || "Home";

  switch (routeName) {
    case "Content":
      return false;
    case "Post":
      return false;

    default:
      return true;
  }
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
