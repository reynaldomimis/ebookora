import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { categories, courses } from "../constants/data";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native";
import Explore from "../components/card/Explore";
import NewRelease from "../components/card/NewRelease";
import { useCategory } from "../context/ContextProviders";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const { setSelectedCategory } = useCategory();
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const handleCategoryView = (item) => {
    navigation.navigate("viewer", { item });
    setSelectedCategory(item.title);
  };

  const handleSeeMore = (title) => {
    navigation.navigate("seemore", { title });
  };

  const handleBookmark = () => {
    navigation.navigate("favorite");
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    // navigation.navigate("search/[query]", { query });
  };

  // Header Component
  const Header = () => (
    <View className="bg-white">
      {/* Top Section */}
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

          <TouchableOpacity onPress={handleBookmark}>
            <Icon name="bookmark" size={35} color="white" />
          </TouchableOpacity>
        </View>
        {/* Search Input */}
        <View className="flex-row items-center mt-4 px-4 py-1 rounded-2xl bg-white/20 self-center w-full">
          <TextInput
            // value={query}
            // onChangeText={setQuery}
            placeholder="Search courses..."
            placeholderTextColor="white"
            className="text-white text-base flex-1"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="magnify" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Categories Section */}
      <Text className="text-xl font-psemibold my-2 px-4 py-4">
        Explore Courses
      </Text>

      {/* Scrollable Explore of Courses */}
      <Explore data={categories} />

      {/* Courses List Header */}
      <View className="flex-row justify-between py-4 items-center px-4 mt-2">
        <Text className="text-xl font-psemibold">New Collection</Text>
        <TouchableNativeFeedback
          onPress={() => handleSeeMore("List of Collections")}
        >
          <Text className="text-base font-pmedium text-blue">See More</Text>
        </TouchableNativeFeedback>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Render Fixed Header */}
      <Header />

      {/* Scrollable New of Courses */}
      <NewRelease data={courses} onPress={handleCategoryView} />
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default Home;
