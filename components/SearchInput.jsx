// components/SearchInput.jsx
import React, { useState } from "react";
import { View, TextInput } from "react-native";

const SearchInput = ({ initialQuery, refetch }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    refetch(query);
  };

  return (
    <View className="flex-row items-center bg-secondary p-3 rounded-lg">
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search..."
        placeholderTextColor="#A0A0A0"
        className="flex-1 text-white font-pmedium"
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

export default SearchInput;
