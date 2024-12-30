import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import {
  addBookmark,
  getBooksByBookmarks,
  removeBookmark,
} from "../lib/appwrite";

// Create Context
const CategoryContext = createContext();

// Create a custom hook to use the context
export const useCategory = () => {
  return useContext(CategoryContext);
};

// Create a provider component
export const CategoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [points, setPoints] = useState(0);

  const addFavorite = async (item) => {
    try {
      await addBookmark(user.$id, item.$id);
      await fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (itemId) => {
    try {
      await removeBookmark(user.$id, itemId);
      await fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await getBooksByBookmarks(user?.$id);
      setFavorites(response);
    } catch (error) {
      console.error("Error re-fetching favorites:", error);
    }
  };

  // Function to increment points
  const incrementPoints = (newPoints) => {
    setPoints((prevPoints) => prevPoints + newPoints);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite,
        selectedItems,
        setSelectedItems,
        points,
        incrementPoints,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
