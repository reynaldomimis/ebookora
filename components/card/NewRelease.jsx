import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCategory } from "../../context/ContextProviders";
import EmptyState from "../EmptyState";
import { useNavigation } from "expo-router";

const NewRelease = ({ data }) => {
  const { favorites, addFavorite, removeFavorite, setSelectedItems } =
    useCategory();
  const navigation = useNavigation();

  // Course Item Component
  const RenderNewReleaseItem = ({ item }) => {
    // Check if item is already in favorites
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    const handleBookmark = () => {
      if (isFavorite) {
        // Remove from favorites if already added
        removeFavorite(item.id);
      } else {
        // Add to favorites
        addFavorite(item);
      }
    };

    const handleItem = () => {
      navigation.navigate("view_pdf");
      setSelectedItems({
        id: item.id,
        title: item.title,
      });
    };

    return (
      <Pressable
        onPress={handleItem}
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
