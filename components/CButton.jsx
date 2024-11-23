import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

export default ({ label, handlePress, isLoading, extraStyles = "" }) => (
  <Pressable
    onPress={handlePress}
    className={`bg-blue rounded-3xl py-5 items-center justify-center ${extraStyles}`}
  >
    <Text className="text-lg font-bold text-white flex-row items-center">
      {label}
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </Text>
  </Pressable>
);
