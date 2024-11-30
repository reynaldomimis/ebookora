import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, AppState } from "react-native";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Svg, Circle } from "react-native-svg";
import { useCategory } from "../context/ContextProviders";
import { useFocusEffect } from "@react-navigation/native";

const ViewPF = () => {
  const { selectedItems, points, incrementPoints } = useCategory();
  const navigation = useNavigation();

  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(true); // Track if the timer is active

  useEffect(() => {
    let timer;

    // Only start the timer if it's active
    if (timerActive) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
        if ((timeSpent + 1) % 60 === 0) {
          incrementPoints(10); // Increment points every minute
        }
      }, 1000);
    }

    // Cleanup timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [timeSpent, timerActive, incrementPoints]);

  // Handle app state changes for pausing timer when app goes to background
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        setTimerActive(false); // Stop the timer when app is in background
      } else if (nextAppState === "active") {
        setTimerActive(true); // Resume the timer when app is active
      }
    };

    const appStateListener = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, []);

  // Use React Navigation's useFocusEffect to manage timer when screen is focused/unfocused
  useFocusEffect(
    React.useCallback(() => {
      // Start the timer when the screen is focused
      setTimerActive(true);

      // Stop the timer when the screen is unfocused
      return () => {
        setTimerActive(false);
      };
    }, [])
  );

  // Calculate progress (0 to 1)
  const progress = (timeSpent % 60) / 60;
  const radius = 30;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progressStroke = circumference * progress;

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue pt-16 pb-4 mb-4">
        <View className="flex-row items-center justify-between px-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-center text-white">
            My Earned Points
          </Text>

          {/* Circular Background for Points */}
          <View className="bg-white rounded-xl px-4 py-2">
            <Text className="text-base text-red-500 font-psemibold">
              {points || "0"} ebk
            </Text>
          </View>
        </View>
      </View>

      <View className="px-4">
        <Text className="text-lg">ID: {selectedItems.id}</Text>
        <Text className="text-lg mt-2">
          Time Spent: {Math.floor(timeSpent / 60)} min {timeSpent % 60} sec
        </Text>
        <Text className="text-lg mt-2">Points Earned: {points}</Text>
      </View>

      {/* Floating Circular Progress Icon */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => alert(`Points: ${points}`)}
      >
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            stroke="#21A0A5"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progressStroke}
            strokeLinecap="round"
          />
        </Svg>
        <Icon
          name="progress-check"
          size={24}
          color="#21A0A5"
          style={styles.icon}
        />
      </TouchableOpacity>

      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    position: "absolute",
  },
});

export default ViewPF;
