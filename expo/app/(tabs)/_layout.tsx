import { Tabs } from "expo-router";
import { Home, Newspaper, Play, Rss } from "lucide-react-native";
import React from "react";
import { View, Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: '#0f4c75',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color, size }) => <Newspaper color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="center"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: focused ? '#0f4c75' : '#3282b8',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -10,
            }}>
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#0f4c75',
                }} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="media"
        options={{
          title: "Media",
          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "ADNOC Feed",
          tabBarIcon: ({ color, size }) => <Rss color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}