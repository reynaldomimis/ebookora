import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Toolbars = ({
  title,
  isSearchVisible,
  setSearchVisible,
  searchQuery,
  onSearch,
}) => {
  const navigation = useNavigation();

  // Toggle search visibility and reset search state when cancelled
  const toggleSearch = () => {
    if (isSearchVisible) {
      onSearch(""); // Reset search when closing
    }
    setSearchVisible(!isSearchVisible);
  };

  return (
    <View className="bg-blue pt-16 pb-4 mb-4">
      <View className="flex-row items-center justify-between px-4 gap-x-6">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="white" />
        </TouchableOpacity>

        {/* Conditional Title or Search Bar */}
        {isSearchVisible ? (
          <TextInput
            value={searchQuery}
            onChangeText={onSearch}
            placeholder="Search"
            placeholderTextColor="white"
            style={{
              flex: 1,
              color: "white",
              marginRight: 8,
              fontSize: 16,
              paddingBottom: 16,
            }}
            underlineColorAndroid="white"
            className="text-white flex-1 p-2 text-base font-pmedium"
          />
        ) : (
          <Text className="text-xl font-psemibold text-center flex-1 sm:text-2xl md:text-3xl text-white">
            {title}
          </Text>
        )}

        {/* Search Icon */}
        <TouchableOpacity onPress={toggleSearch}>
          <Icon
            name={isSearchVisible ? "close" : "magnify"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Toolbars;
