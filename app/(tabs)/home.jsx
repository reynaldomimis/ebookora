import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Explore from "../../components/card/Explore";
import NewRelease from "../../components/card/NewRelease";
import { useCategory } from "../../context/ContextProviders";
import SearchInput from "../../components/SearchInput";
import {
  getAllBooks,
  getUnreadNotificationsCount,
  updateIsReadNotificationByUserId,
} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
  const router = useRouter();
  // const { data: posts, refetch } = useAppwrite(getAllBooks);
  const { setSelectedCategory, points } = useCategory();
  const { user } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadNotificationsCount();
        setNotificationCount(count);
      } catch (error) {
        console.error("Failed to fetch unread notifications count:", error);
      }
    };
    fetchUnreadCount();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const count = await getAllBooks();
        setPost(count);
      } catch (error) {
        console.error("Failed to fetch unread notifications count:", error);
      }
    };
    fetchPost();
  }, []);

  const handleNotificationPress = async () => {
    await updateIsReadNotificationByUserId(user?.$id, true);
    setNotificationCount(0);
    router.push("/notifications");
  };

  const handleCategoryView = (item) => {
    router.push("/view_pdf");
    setSelectedCategory(item.title);
  };

  const Header = () => (
    <View className="bg-white">
      <View className="bg-blue pt-16 pb-4 px-6">
        <View className="flex-row items-center justify-between mb-2">
          <View className="gap-2">
            <Text className="text-white text-lg font-pmedium">
              Welcome to eBookora 👋
            </Text>
            <Text className="text-2xl text-white font-psemibold">
              {user?.username || user?.name}
            </Text>
          </View>
          <View className="flex-col items-center justify-between ">
            {/* Notification badge */}
            <View className="relative flex-row justify-center items-center p-2">
              <TouchableOpacity onPress={handleNotificationPress}>
                <View>
                  {/* Notification Icon */}
                  <Icon
                    name={notificationCount > 0 ? "bell" : "bell-outline"}
                    size={30}
                    color="white"
                  />
                  {/* Badge */}
                  {notificationCount > 0 && (
                    <View className="absolute top-[-5] right-[-5] bg-red-600 rounded-full px-2 py-1 min-w-[20px] justify-center items-center">
                      <Text className="text-white text-xs font-bold text-center">
                        {notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search query params */}
        <SearchInput />
        {/* Earned points total */}
        <View className="flex-row justify-end mt-4">
          <Text className="text-lg text-white font-psemibold mr-2">
            Total Points:
          </Text>
          <Text className="text-lg text-white font-pbold">
            {points || "0"} ebk
          </Text>
        </View>
      </View>
      <Text className="text-xl font-psemibold my-2 px-4 py-4">
        Explore Courses
      </Text>
      <Explore />
      <View className="flex-row justify-between py-4 items-center px-4 mt-2">
        <Text className="text-xl font-psemibold">New Collection</Text>
        <TouchableOpacity onPress={() => router.push("/seemore")}>
          <Text className="text-base font-pmedium text-blue">See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <Header />
      <NewRelease posts={posts} onPress={handleCategoryView} />
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default Home;
