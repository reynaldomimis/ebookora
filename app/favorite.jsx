import React, { useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCategory } from "../context/ContextProviders";
import Toolbars from "../components/Toolbars";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Favorite = ({ onPress }) => {
  const { favorites, addFavorite, removeFavorite } = useCategory();
  const route = useRouter();
  const { title } = "Test";
  const [searchQuery, setSearchQuery] = useState("");
  // const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Handle search input change
  const handleSearch = (query) => {
    // setSearchQuery(query);
    // if (query.trim() === "") {
    //   setFilteredCourses(courses);
    // } else {
    //   const filtered = courses.filter((course) =>
    //     course.title.toLowerCase().includes(query.toLowerCase())
    //   );
    //   setFilteredCourses(filtered);
    // }
  };

  const handleCategoryView = (item) => {
    // navigation.navigate("viewer", { item });
  };

  const RenderFavoriteItem = ({ item }) => (
    <View className="flex-1 p-2">
      <Pressable
        className="bg-white rounded-md"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        <Image
          source={{ uri: item.image }}
          resizeMode="stretch"
          className="w-full h-52 rounded-t-lg"
        />
        <View className="flex-col p-4">
          <Text className="text-lg font-semibold">{item.title}</Text>
          <Text className="text-base font-plight">{item.description}</Text>
        </View>

        {/* Actions - Smaller Icons for Reading and Add to Favorites */}
        <View className="flex-row justify-between items-center px-4 pb-4 gap-x-4">
          {/* Price on the left side */}
          <Text
            className={`text-xl font-semibold ${
              item.price === "FREE" ? "text-red-500" : "text-green-500"
            }`}
          >
            {item.price}
          </Text>

          {/* Read and Delete buttons on the right side */}
          <View className="flex-row justify-end items-center gap-x-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={onPress}
            >
              <Icon name="book-open-page-variant" size={25} color="gray" />
              <Text className="ml-1 text-xs text-gray-500">Read</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => removeFavorite(item.id)}
            >
              <Icon name="delete-outline" size={25} color="gray" />
              <Text className="ml-1 text-xs text-gray-500">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Reusable Toolbar Component */}
      <Toolbars
        title="Bookmarks"
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderFavoriteItem item={item} />}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 8,
          backgroundColor: "white",
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Favorite;
