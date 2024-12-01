import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { categories, courses } from "../../constants/data";
import Explore from "../../components/card/Explore";
import NewRelease from "../../components/card/NewRelease";
import { useCategory } from "../../context/ContextProviders";
import SearchInput from "../../components/SearchInput";

const Home = () => {
  const { setSelectedCategory, points, user } = useCategory();
  const [notificationCount, setNotificationCount] = useState(3);
  const navigation = useNavigation();

  const handleNotificationPress = () => {
    navigation.navigate("notifications");
    setNotificationCount(0);
  };

  console.log("Test", JSON.stringify(user, null, 2));

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
              Welcome to eBookora 👋
            </Text>
            <Text className="text-2xl text-white font-psemibold">
              {user?.labels}
            </Text>
          </View>
          <View className="flex-col items-center justify-between ">
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
        </View>

        {/* Search query params */}
        <SearchInput />
        {/* Earned points total */}
        <View className="flex-row justify-end mt-4">
          <Text className="text-lg text-white font-psemibold mr-2">
            Total Points:
          </Text>
          <Text className="text-lg text-white font-pbold">
            {points || "0"} ebk
          </Text>
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
