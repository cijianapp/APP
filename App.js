import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Homepage from "./components/homepage";
import Recommend from "./components/recommend";
import PostDetail from "./components/postDetail";
import Guilds from "./components/guilds";
import Content from "./components/content";

import { Provider } from "react-redux";
import store from "./redux/store";

const RootStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const HomeTab = createMaterialTopTabNavigator();
const GuildsStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
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
      <MainTab.Screen name="Home" component={HomeTabScreen} />
      <MainTab.Screen name="Guilds" component={GuildsStackScreen} />
      <MainTab.Screen name="Talking" component={SettingsScreen} />
    </MainTab.Navigator>
  );
}

function HomeTabScreen() {
  return (
    <HomeTab.Navigator
      options={{ showLabel: false }}
      tabBarOptions={{
        labelStyle: { fontSize: 12 }
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
    </GuildsStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Content"
            component={Content}
            options={({ route }) => ({
              title: route.params.title
            })}
          />
          <RootStack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{ headerShown: true }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
