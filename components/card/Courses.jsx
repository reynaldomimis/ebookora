import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EmptyState from "../EmptyState";
import { useCategory } from "../../context/ContextProviders";
import { useNavigation } from "expo-router";

export default Courses = ({ posts }) => {
  const {
    favorites,
    addFavorite,
    removeFavorite,
    setSelectedItems,
    selectedItems,
  } = useCategory();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true); // Manage loading state

  // Filter the data by `item.course`
  const filteredData = posts.filter(
    (item) => item.course === selectedItems.course
  );

  useEffect(() => {
    // Simulate fetching or delay to update loading state
    if (posts) {
      setLoading(false); // Data is fetched, set loading to false
    }
  }, [posts]);

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

  // Render loading component
  const renderLoading = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#21A0A5" />
    </View>
  );

  // If still loading, show loading spinner, otherwise show FlatList
  return (
    <FlatList
      data={loading ? [] : filteredData} // Show empty array while loading
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <RenderExploreItem item={item} />}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
      // ListEmptyComponent={loading ? renderLoading() : EmptyState} // Show loading or empty state
    />
  );
};
