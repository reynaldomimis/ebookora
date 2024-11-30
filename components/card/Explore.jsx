import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native";
import { useNavigation } from "expo-router";
import { useCategory } from "../../context/ContextProviders";
import EmptyState from "../EmptyState";

export default Explore = ({ data }) => {
  const navigation = useNavigation();
  const { setSelectedItems } = useCategory();

  // Category Item Component
  const RenderExploreItem = ({ item }) => (
    <TouchableOpacity
      className="items-center mx-2"
      onPress={() => {
        navigation.navigate("view_course");
        setSelectedItems({
          title: item.title,
          course: item.course,
        });
      }}
    >
      <View className="w-14 h-14 bg-blue rounded-full items-center justify-center mb-2">
        <Icon name={item.icon} size={30} color="white" />
      </View>
      <Text className="text-sm font-pmedium text-center">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RenderExploreItem item={item} />}
      ListEmptyComponent={EmptyState}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      ItemSeparatorComponent={() => <View className="w-2" />}
    />
  );
};
