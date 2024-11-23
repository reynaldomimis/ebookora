import { Image, View, Text, TouchableOpacity } from "react-native";
import { images } from "../constants/index";
import { useNavigation } from "expo-router";

const EmptyState = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-12">
      <Image
        source={images.laughing}
        style={{ width: 150, height: 150, marginBottom: 16 }}
      />
      <Text className="text-2xl font-psemibold text-[#6B6B6B] mt-8">
        No Records Found
      </Text>
      <Text className="text-base text-[#9A9A9A] mt-2">
        Try adjusting your search criteria or check back later.
      </Text>

      {/* Go Back Button */}
      <TouchableOpacity
        onPress={handleGoBack}
        className="mt-10 bg-blue px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-base font-pmedium">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
