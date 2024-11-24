import { View, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TabIcon = ({ iconName, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons
        name={iconName}
        size={24} // Icon size
        color={color}
      />
      <Text
        style={[
          styles.iconText,
          { color: color, fontWeight: focused ? "600" : "400" },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      {/* Tab navigation */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#21A0A5",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F9FAFB",
            height: 72,
            paddingTop: 14,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="home"
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Bookmarks",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="bookmark"
                color={color}
                name="Bookmarks"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="cog"
                color={color}
                name="Settings"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      {/* Add StatusBar to configure its color */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </>
  );
};

// Define styles for TabIcon
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  iconText: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default TabLayout;
