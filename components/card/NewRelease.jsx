import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCategory } from "../../context/ContextProviders";
import EmptyState from "../EmptyState";

const NewRelease = ({ data, onPress }) => {
  const { favorites, addFavorite, removeFavorite } = useCategory(); // Access context

  // Course Item Component
  const RenderNewReleaseItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id); // Check if item is already in favorites

    const handleBookmark = () => {
      if (isFavorite) {
        removeFavorite(item.id); // Remove from favorites if already added
      } else {
        addFavorite(item); // Add to favorites
      }
    };

    return (
      <Pressable
        onPress={() => alert("You pressed an item!")}
        style={{
          flexDirection: "row",
          padding: 16,
          marginBottom: 8,
          backgroundColor: "white",
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        {/* Course Image */}
        <Image
          source={{ uri: item.image }}
          resizeMode="stretch"
          style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
        />

        {/* Course Info */}
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
          <Text style={{ fontSize: 14, color: "#6B6B6B" }}>by {item.by}</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: item.price === "FREE" ? "red" : "green",
            }}
          >
            {item.price}
          </Text>
        </View>

        {/* Bookmark Icon */}
        <TouchableOpacity onPress={handleBookmark} style={{ marginLeft: 8 }}>
          <Icon
            name={isFavorite ? "bookmark-minus" : "bookmark-plus-outline"}
            size={30}
            color="#4A4A4A"
          />
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RenderNewReleaseItem item={item} />}
      ListEmptyComponent={EmptyState}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NewRelease;
