import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAllNotifications } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import moment from "moment";

// Notification Item Component
const NotificationItem = ({ subject, description, link }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100;

  // Check if the description exceeds the maximum length
  const isLongText = description.length > maxLength;

  const openLink = () => {
    if (link) Linking.openURL(link);
  };

  return (
    <TouchableOpacity
      className="flex-row items-start justify-between p-3 mb-3 bg-white rounded-lg shadow"
      onPress={() => isLongText && setExpanded(!expanded)}
    >
      <View className="flex-1 mr-2">
        <Text className="text-base font-bold text-gray-800 mb-1">
          {subject}
        </Text>
        <Text
          className="text-sm text-gray-500"
          numberOfLines={expanded || !isLongText ? 0 : 2}
        >
          {description}
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
        {/* Show Link Button */}
        {link && (
          <Text
            className="text-xs text-blue-700 mt-2 underline"
            onPress={openLink}
          >
            Open Link
          </Text>
        )}
      </View>
      <Text className="text-xs text-gray-400">
        {moment().startOf("seconds").fromNow()}
      </Text>
    </TouchableOpacity>
  );
};

// Group Notifications by Date
const groupByDate = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});
};

const Notifications = () => {
  const navigation = useNavigation();
  const { data: notifications, refetch } = useAppwrite(getAllNotifications);
  // Ensure notifications data exists before grouping
  const groupedNotifications = notifications ? groupByDate(notifications) : {};

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
      {/* Notification List */}
      <FlatList
        data={Object.keys(groupedNotifications)}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View>
            {/* Date Section */}
            <Text className="text-sm font-bold text-gray-600 mt-5 mb-2">
              {moment().format("LLL")}
            </Text>
            {groupedNotifications[item].map((notification) => (
              <NotificationItem
                key={notification.$id}
                subject={notification.subject}
                description={notification.description}
                link={notification.link}
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
