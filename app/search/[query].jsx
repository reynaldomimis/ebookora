import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { courses } from "../../constants/data";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);

  // Mock refetch function to use sample data
  const refetch = () => {
    const filteredPosts = courses.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-black text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-black mt-1">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState />}
      />
    </SafeAreaView>
  );
};

export default Search;
