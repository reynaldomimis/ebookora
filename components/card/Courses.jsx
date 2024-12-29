import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCategory } from "../../context/ContextProviders";
import { useNavigation } from "expo-router";
import EmptyState from "../EmptyState";

export default Courses = ({ posts }) => {
  const {
    favorites,
    addFavorite,
    removeFavorite,
    setSelectedItems,
    selectedItems,
  } = useCategory();
  const navigation = useNavigation();

  // Filter the data by `item.course`
  const filteredData = posts.filter(
    (item) => item.course === selectedItems.course
  );

  const renderFooter = () => {
    if (filteredData.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text>No courses available</Text>
        </View>
      );
    }
    return null;
  };

  const RenderExploreItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.$id === item.$id);

    const handleBookmark = () => {
      if (isFavorite) {
        removeFavorite(item.id);
      } else {
        addFavorite(item);
      }
    };

    const handleItem = () => {
      navigation.navigate("view_pdf");
      setSelectedItems({
        id: item.id,
        course: item.course,
      });
    };

    return (
      <View className="flex-1 p-2">
        <View
          className="bg-white"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 1,
            borderRadius: 4,
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            resizeMode="stretch"
            className="w-full h-60 rounded-t-lg"
          />
          <View className="p-4">
            <Text className="text-base font-semibold">{item.title_book}</Text>
          </View>

          <View className="flex-row justify-between items-center px-4 pb-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleItem}
            >
              <Icon name="book-open-page-variant" size={24} color="gray" />
              <Text className="ml-1 text-xs text-gray-500">Read</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleBookmark}
            >
              <Icon
                name={isFavorite ? "bookmark-minus" : "bookmark-plus-outline"}
                size={24}
                color="gray"
              />
              <Text className="ml-1 text-xs text-gray-500">Bookmark</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <RenderExploreItem item={item} />}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
      ListEmptyComponent={EmptyState}
    />
  );
};
