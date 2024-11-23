import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";

// Category Item Component
export const renderCategoryItem = ({ item, onPress }) => (
  <TouchableOpacity className="items-center mx-2" onPress={() => onPress(item)}>
    <View className="w-20 h-20 bg-blue rounded-full items-center justify-center mb-2">
      <Icon name={item.icon} size={30} color="white" />
    </View>
    <Text className="text-sm font-pmedium text-center">{item.title}</Text>
  </TouchableOpacity>
);

// Course Item Component
export const renderCourseItem = ({ item, handleCategoryView }) => (
  <View className="flex-row items-center p-4 mb-4 bg-gray-50 rounded-lg">
    <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg mr-4" />
    <View className="flex-1 gap-2">
      <Text className="text-lg font-psemibold">{item.title}</Text>
      <Text className="text-sm font-pmedium text-gray-600">by {item.by}</Text>
      <Text className="text-lg font-psemibold text-green-500">
        {item.price}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => handleCategoryView(item)}
      className="bg-blue py-2 px-4 rounded-lg"
    >
      <Text className="text-white font-pmedium">VIEW</Text>
    </TouchableOpacity>
  </View>
);
