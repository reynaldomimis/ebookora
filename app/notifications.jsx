import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Dummy Notification Data
// Dummy Notification Data
const notifications = [
  {
    id: "1",
    title: "A new ticket has been opened by Visitor",
    subtitle:
      "You have been assigned a new ticket with detailed instructions on resolving the issue. Please prioritize this task.",
    time: "22 min",
    date: "NOV 16, WED 2022",
  },
  {
    id: "2",
    title: "A new ticket has been opened by Visitor",
    subtitle: "You have been assigned a new ticket.",
    time: "22 min",
    date: "NOV 16, WED 2022",
  },
  {
    id: "3",
    title: "A new ticket has been opened by oliver-smith-preview-mode",
    subtitle: "You have been assigned a new ticket.",
    time: "22 min",
    date: "NOV 16, WED 2022",
  },
  {
    id: "4",
    title: "Ticket Assigned",
    subtitle: "You have been assigned a new ticket.",
    time: "22 min",
    date: "NOV 15, TUE 2022",
  },
];

// Group Notifications by Date
const groupByDate = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});
};

const NotificationItem = ({ title, subtitle, time }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100; // Define a maximum length for the subtitle

  // Check if the subtitle exceeds the maximum length
  const isLongText = subtitle.length > maxLength;

  return (
    <TouchableOpacity
      className="flex-row items-start justify-between p-3 mb-3 bg-white rounded-lg shadow"
      onPress={() => isLongText && setExpanded(!expanded)}
    >
      <View className="flex-1 mr-2">
        <Text className="text-base font-bold text-gray-800 mb-1">{title}</Text>
        <Text
          className="text-sm text-gray-500"
          numberOfLines={expanded || !isLongText ? 0 : 2} // Show limited lines or expand
        >
          {subtitle}
        </Text>
        {/* Show 'Read More' / 'Show Less' only if the text is long */}
        {isLongText && (
          <Text
            className="text-xs text-blue-500 mt-1"
            onPress={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
          </Text>
        )}
      </View>
      <Text className="text-xs text-gray-400">{time}</Text>
    </TouchableOpacity>
  );
};

const Notifications = () => {
  const navigation = useNavigation();
  const groupedNotifications = groupByDate(notifications);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Toolbar */}
      <View className="bg-blue pt-16 pb-4 mb-1">
        <View className="flex-row items-center justify-between px-4">
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-center flex-1 text-white pr-8">
            Notifications
          </Text>
        </View>
      </View>
      <FlatList
        data={Object.keys(groupedNotifications)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Date Section */}
            <Text className="text-sm font-bold text-gray-600 mt-5 mb-2">
              {item}
            </Text>
            {groupedNotifications[item].map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                subtitle={notification.subtitle}
                time={notification.time}
              />
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </View>
  );
};

export default Notifications;
