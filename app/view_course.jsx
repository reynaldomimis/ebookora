import { Text, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toolbars from "../components/Toolbars";
import { useNavigation, useRoute } from "@react-navigation/native";
import { coursesBooks } from "../constants/data";
import Courses from "../components/card/Courses";
import { useCategory } from "../context/ContextProviders";
import { StatusBar } from "expo-status-bar";

const ViewCourse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(coursesBooks);
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCourses(coursesBooks);
    } else {
      const filtered = coursesBooks.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  // Toggle search visibility and reset search state when cancelled
  const toggleSearch = () => {
    if (isSearchVisible) {
      setSearchQuery("");
      setFilteredCourses(coursesBooks);
    }
    setSearchVisible(!isSearchVisible);
  };

  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <View className="flex-1 bg-white">
      {/* Reusing Toolbars Component */}
      <Toolbars
        title={selectedCategory}
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      {/* Scrollable New of Courses */}
      <Courses data={filteredCourses} />
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default ViewCourse;
