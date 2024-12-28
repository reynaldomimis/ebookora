import React, { useState, useEffect } from "react";
import { View } from "react-native";
import NewRelease from "../components/card/NewRelease";
import Toolbars from "../components/Toolbars";
import { StatusBar } from "expo-status-bar";
import useAppwrite from "../lib/useAppwrite";
import { getAllBooks } from "../lib/appwrite";

const SeeMore = () => {
  const { data: posts, refetch } = useAppwrite(getAllBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(posts || []);
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Update filteredCourses when posts change
  useEffect(() => {
    if (posts && Array.isArray(posts)) {
      setFilteredCourses(posts);
    }
  }, [posts]);

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCourses(posts);
    } else {
      const filtered = posts.filter((course) =>
        course.title_book.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered); // Update with filtered results
    }
  };

  const handleCategoryView = (item) => {
    // Handle category view navigation
    // navigation.navigate("view_pdf", { item });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Reusable Toolbar Component */}
      <Toolbars
        title={"List of Collections"}
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      {/* New Release List */}
      <NewRelease posts={filteredCourses} onPress={handleCategoryView} />
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default SeeMore;
