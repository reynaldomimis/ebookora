import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EmptyState from "../EmptyState";

export default Courses = ({ data, onPress }) => {
  // Explore courses Item Component
  const RenderExploreItem = ({ item }) => (
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
          source={{ uri: item.image }}
          resizeMode="stretch"
          className="w-full h-60 rounded-t-lg"
        />
        <View className="p-4">
          <Text className="text-base font-semibold">{item.title}</Text>
        </View>

        {/* Actions - Smaller Icons for Reading and Add to Favorites */}
        <View className="flex-row justify-between items-center px-4 pb-4">
          <TouchableOpacity className="flex-row items-center" onPress={onPress}>
            <Icon name="book-open-page-variant" size={20} color="gray" />
            <Text className="ml-1 text-xs text-gray-500">Read</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center" onPress={onPress}>
            <Icon name="heart-outline" size={20} color="gray" />
            <Text className="ml-1 text-xs text-gray-500">Favorite</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RenderExploreItem item={item} />}
      ListEmptyComponent={EmptyState}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
    />
  );
};
