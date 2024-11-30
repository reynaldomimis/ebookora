import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { categories, courses } from "../../constants/data";
import Explore from "../../components/card/Explore";
import NewRelease from "../../components/card/NewRelease";
import { useCategory } from "../../context/ContextProviders";

const Home = () => {
  const { setSelectedCategory } = useCategory();
  const [notificationCount, setNotificationCount] = useState(3);
  const navigation = useNavigation();

  const handleNotificationPress = () => {
    navigation.navigate("notifications");
    setNotificationCount(0);
  };

  const handleCategoryView = (item) => {
    navigation.navigate("view_pdf");
    setSelectedCategory(item.title);
  };

  const Header = () => (
    <View className="bg-white">
      <View className="bg-blue pt-16 pb-4 px-6">
        <View className="flex-row items-center justify-between mb-2">
          <View className="gap-2">
            <Text className="text-white text-lg font-pmedium">
              Good Morning👋
            </Text>
            <Text className="text-2xl text-white font-psemibold">
              Reynaldo Tesoy
            </Text>
          </View>
          {/* Notification badge */}
          <View className="relative flex-row justify-center items-center p-2">
            <TouchableOpacity onPress={handleNotificationPress}>
              <View>
                {/* Notification Icon */}
                <Icon
                  name={notificationCount > 0 ? "bell" : "bell-outline"}
                  size={30}
                  color="white"
                />
                {/* Badge */}
                {notificationCount > 0 && (
                  <View className="absolute top-[-5] right-[-5] bg-red-600 rounded-full px-2 py-1 min-w-[20px] justify-center items-center">
                    <Text className="text-white text-xs font-bold text-center">
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row items-center mt-4 px-4 py-1 rounded-2xl bg-white/20 self-center w-full">
          <TextInput
            placeholder="Search courses..."
            placeholderTextColor="white"
            className="text-white text-base flex-1"
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity>
            <Icon name="magnify" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-xl font-psemibold my-2 px-4 py-4">
        Explore Courses
      </Text>
      <Explore data={categories} />
      <View className="flex-row justify-between py-4 items-center px-4 mt-2">
        <Text className="text-xl font-psemibold">New Collection</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("seemore", { title: "List of Collections" })
          }
        >
          <Text className="text-base font-pmedium text-blue">See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <Header />
      <NewRelease data={courses} onPress={handleCategoryView} />
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default Home;
