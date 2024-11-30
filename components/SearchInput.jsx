import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex-row items-center mt-4 px-4 py-1 rounded-2xl bg-white/20 self-center w-full">
      <TextInput
        value={query}
        placeholder="Search courses..."
        placeholderTextColor="white"
        onChangeText={(e) => setQuery(e)}
        className="text-white text-base font-pmedium flex-1"
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "") {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across the database"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Icon name="magnify" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
