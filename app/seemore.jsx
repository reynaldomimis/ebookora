import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { courses } from "../constants/data";
import NewRealease from "../components/card/NewRelease";
import Toolbars from "../components/Toolbars";
import { StatusBar } from "expo-status-bar";

const SeeMore = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const handleCategoryView = (item) => {
    navigation.navigate("view_pdf", { item });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Reusable Toolbar Component */}
      <Toolbars
        title={title}
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      {/* Courses List */}
      <NewRealease data={filteredCourses} onPress={handleCategoryView} />
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default SeeMore;
