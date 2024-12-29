import { View } from "react-native";
import React, { useState, useEffect } from "react";
import Toolbars from "../components/Toolbars";
import Courses from "../components/card/Courses";
import { useCategory } from "../context/ContextProviders";
import { StatusBar } from "expo-status-bar";
import { getAllBooks } from "../lib/appwrite";

const ViewCourse = () => {
  // const { data: posts, refetch } = useAppwrite(getAllBooks);
  const { selectedItems } = useCategory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const books = await getAllBooks();
        setPost(books);
      } catch (error) {
        console.error("Failed to fetch unread notifications count:", error);
      }
    };
    fetchPost();
  }, []);

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
      setFilteredCourses(filtered);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Reusing Toolbars Component */}
      <Toolbars
        title={selectedItems.course}
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      {/* Scrollable List of Courses */}
      <Courses posts={filteredCourses} />
      {/* StatusBar to set light status bar style */}
      <StatusBar backgroundColor="#21A0A5" style="light" />
    </View>
  );
};

export default ViewCourse;
