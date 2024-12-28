import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useCategory } from "../../context/ContextProviders";
import { getAllCategories } from "../../lib/appwrite";
import { useEffect, useState } from "react";

export default Explore = () => {
  const router = useRouter();
  // const { data: category, refetch } = useAppwrite(getAllCategories);
  const { setSelectedItems } = useCategory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await getAllCategories();

        if (!category || category.length === 0) {
          setCategories([]);
          return;
        }

        let processedCategories = [];

        category.forEach((item) => {
          if (item.categories) {
            item.categories.forEach((cat) => {
              try {
                const parsedCategory = JSON.parse(cat);
                processedCategories.push(parsedCategory);
              } catch (error) {
                console.error("Error parsing category string:", error);
              }
            });
          }
        });
        setCategories(processedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Category Item Component
  const RenderExploreItem = ({ item }) => (
    <TouchableOpacity
      className="items-center mx-2"
      onPress={() => {
        // Set selected items before navigating
        setSelectedItems({
          course: item.course,
        });
        // Navigate to the view_course screen using Expo Router
        router.push("/view_course");
      }}
    >
      <View className="w-14 h-14 bg-blue rounded-full items-center justify-center mb-2">
        <Icon name={item.icon} size={30} color="white" />
      </View>
      <Text className="text-sm font-pmedium text-center">{item.course}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <RenderExploreItem item={item} />}
      // ListEmptyComponent={EmptyState}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      ItemSeparatorComponent={() => <View className="w-2" />}
    />
  );
};
