import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"; // For Drawer Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // For Tab Navigation
import Icon from "react-native-vector-icons/Ionicons"; // For Tab Icons
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import MessageScreen from "./Screens/MessageScreen";
import NotificationScreen from "./Screens/NotificationScreen";
import SettingScreen from "./Screens/SettingScreen";
import NewPostScreen from "./Screens/NewPostScreen";
import Header from "./Components/Header";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function NavigationSocial() {
  const isDarkMode = true; // Set to true to enforce dark mode everywhere

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation} />, // Use the custom header for all screens
          drawerStyle: {
            backgroundColor: isDarkMode ? "#121212" : "#fff", // Dark mode for the drawer background
            width: 240, // Smaller drawer size
          },
          drawerLabelStyle: {
            color: isDarkMode ? "#fff" : "#000", // Text color for drawer labels
          },
          drawerActiveTintColor: "#007bff", // Active icon and text color
          drawerInactiveTintColor: "#fff", // Inactive icon and text color
        }}
      >
        {/* Drawer Screen with Tabs */}
        <Drawer.Screen name="Back"
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="arrow-back" size={size} color={color} />
          )
        }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: "#007bff",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                  backgroundColor: isDarkMode ? "#121212" : "#fff", // Dark Mode Tab Bar
                  
                },
                headerShown: false,
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon name={focused ? "home" : "home-outline"} size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon name={focused ? "notifications" : "notifications-outline"} size={size} color={color} />
                  ),
                }}
              />
              
              <Tab.Screen
                name="Messages"
                component={MessageScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color} />
                  ),
                }}
              />
              
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon name={focused ? "person" : "person-outline"} size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </Drawer.Screen>

        {/* Drawer Screens */}
        <Drawer.Screen
          name="New Post"
          component={NewPostScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}