import { View, Text, Pressable } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { lottie } from "../constants";

const App = () => {
  const animationRef = useRef(null);
  return (
    <View className="bg-white gap-4 p-4 flex-1 justify-center items-center">
      <LottieView
        source={lottie}
        autoPlay
        loop
        style={{ width: "100%", height: 400 }}
        ref={animationRef}
      />
      <View className="w-full">
        <Text className="text-4xl text-center font-pmedium mx-2">eBookora</Text>
        <Text className="text-center text-xl mx-2">
          Unlimited Learning, Free of Charge
        </Text>

        <Pressable
          onPress={() => router.push("/signin")}
          className="bg-blue rounded-full py-5 items-center justify-center w-3/4 mt-28 self-center"
        >
          <Text className="text-lg font-bold text-white">Get Started</Text>
        </Pressable>
      </View>
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#fff" style="dark" />
    </View>
  );
};

export default App;
