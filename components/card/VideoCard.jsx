// components/VideoCard.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const VideoCard = ({ title, thumbnail, video, creator, avatar }) => {
  return (
    <TouchableOpacity className="mb-4 bg-secondary p-3 rounded-lg">
      <Image
        source={{ uri: thumbnail }}
        className="w-full h-40 rounded-lg mb-3"
        resizeMode="cover"
      />
      <Text className="text-white font-psemibold text-lg mb-1">{title}</Text>
      <View className="flex-row items-center mt-2">
        <Image
          source={{ uri: avatar }}
          className="w-8 h-8 rounded-full mr-3"
          resizeMode="cover"
        />
        <Text className="text-gray-300 text-sm">{creator}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
