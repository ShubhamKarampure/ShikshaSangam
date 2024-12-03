import React from "react";

import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"; // For Drawer Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // For Tab Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons"; // For Tab Icons
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import MessageScreen from "./Chats/Screens/MessageScreen";
import NotificationScreen from "./Screens/NotificationScreen";
import SettingScreen from "./Screens/SettingScreen";
import NewPostScreen from "./Screens/NewPostScreen";
import Header from "./Components/Navigation/Header";
import GroupChatScreen from "./Chats/Screens/GroupChatScreen";
import ChatScreen from "./Chats/Screens/ChatScreen";
import CommentSectionScreen from "./Screens/CommentSectionScreen";
import HomeHeader from "./Components/Navigation/HomeHeader";
import NotificationsHeader from "./Components/Navigation/NotificationsHeader";
import MessagesHeader from "./Components/Navigation/MessagesHeader";
import ProfileHeader from "./Components/Navigation/ProfileHeader";
import {View} from "react-native"
import { AuthProvider,useAuthContext } from "../Context/useAuthContext";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MessageStack() {
  // const navigation = useNavigation();
  // const route = useRoute();
  // React.useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   if (routeName === "Chat") {
  //     navigation.setOptions({ tabBarVisible: false });
  //   } else {
  //     navigation.setOptions({ tabBarVisible: true });
  //   }
  // }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{
          header: () => <MessagesHeader />,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true, // Show header for ChatScreen if needed
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#128C7E" },
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide the header for MessageScreen
      />
      <Stack.Screen
        name="CommentSection"
        component={CommentSectionScreen}
        options={{ title: "COMMENTS", headerShown:false}} // Set the title for ChatScreen
      />
    </Stack.Navigator>
  );
}

export default function NavigationSocial() {
  const isDarkMode = true; // Set to true to enforce dark mode everywhere
  
  return (
    // <AuthProvider>
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          //header: () => <Header>ShikshaSangam</Header>, // Use the custom header
          headerShown: false,
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
        <Drawer.Screen
          name="Back"
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="arrow-back" size={size} color={color} />
            ),
            // headerTitle:'Drawer Screen',
            // headerTitleAlign:'center',
            headerShown: false,
          }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => {
                const routeName =
                  getFocusedRouteNameFromRoute(route) ?? "HomeStack";

                return {
                  tabBarStyle: {
                    display: routeName === "Chat" ? "none" : "flex",
                    backgroundColor: isDarkMode ? "#121212" : "#fff",
                  },
                  tabBarActiveTintColor: "#007bff",
                  tabBarInactiveTintColor: "gray",
                  headerShown: false,
                };
              }}
            >
              <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                      name={focused ? "home" : "home-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                  headerShown: true,
                  header: (navigation) => (
                    <HomeHeader navigation={navigation} />
                  ),
                }}
              />
              <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                      name={focused ? "notifications" : "notifications-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                  headerShown: true,
                  header: (navigation) => (
                    <NotificationsHeader navigation={navigation} />
                  ),
                }}
              />

              <Tab.Screen
                name="Messages"
                component={MessageStack}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                      name={focused ? "chatbubbles" : "chatbubbles-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                  //headerShown: true,
                  // header: (navigation) => (
                  //   <MessagesHeader navigation={navigation} />
                  // ),
                }}
              />

              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                      name={focused ? "person" : "person-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                  headerShown: true,
                  header: (navigation) => (
                    <ProfileHeader navigation={navigation} />
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
            headerShown: true,
            header: () => <Header>ShikshaSangam</Header>,
          }}
        />
        <Drawer.Screen
          name="Group Chat"
          component={GroupChatScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="chatbubbles-outline" size={size} color={color} />
            ),
            headerShown: true,
            header: () => <Header>Group Chats</Header>,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="settings-outline" size={size} color={color} />
            ),
            headerShown: true,
            header: () => <Header>Settings</Header>,
          }}
        />
        {/* <Stack.Navigator>
            <Stack.Screen name="ChatScreen" component={ChatScreen}/>
        </Stack.Navigator> */}
      </Drawer.Navigator>
    </NavigationContainer>
    // </AuthProvider>
  );
}
// NavigationSocial.js;


