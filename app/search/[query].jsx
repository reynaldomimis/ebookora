import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCategory } from "../../context/ContextProviders";
import { getAllBooks } from "../../lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);
  const { favorites, addFavorite, removeFavorite, setSelectedItems } =
    useCategory();
  const navigation = useNavigation();

  // Mock refetch function to use sample data
  const refetch = async () => {
    const courses = await getAllBooks();
    const filteredPosts = courses.filter((item) =>
      item.title_book.toLowerCase().includes(query.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  useEffect(() => {
    refetch();
  }, [query]);

  const RenderExploreItem = ({ item }) => {
    // Check if item is already in favorites
    const isFavorite = favorites.some((fav) => fav.$id === item.$id);

    const handleBookmark = () => {
      if (isFavorite) {
        // Remove from favorites if already added
        removeFavorite(item.$id);
      } else {
        // Add to favorites
        addFavorite(item);
      }
    };

    const handleItem = () => {
      navigation.navigate("view_pdf");
      setSelectedItems({
        id: item.$id,
        title: item.title_book,
      });
    };

    return (
      <View className="flex-1 w-1/2">
        <View className="bg-white shadow-sm rounded-lg m-2">
          <Image
            source={{ uri: item.thumbnail }}
            resizeMode="stretch"
            className="w-full h-60 rounded-t-lg"
          />
          <View className="p-4">
            <Text className="text-base font-semibold">{item.title_book}</Text>
          </View>

          {/* Actions - Reading and Add to Favorites */}
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
    <View className="flex-1 bg-white">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={RenderExploreItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          padding: 8,
        }}
        ListHeaderComponent={() => (
          <View className="bg-blue pt-14 px-6 pb-4">
            <Text className="text-sm font-medium text-white">
              Search Results
            </Text>
            <Text className="text-xl font-semibold text-white mt-2">
              {query}
            </Text>
            <View className="mt-1 mb-0.5">
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={EmptyState}
      />
    </View>
  );
};

export default Search;
