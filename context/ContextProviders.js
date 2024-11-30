import React, { createContext, useContext, useState } from "react";

// Create Context
const CategoryContext = createContext();

// Create a custom hook to use the context
export const useCategory = () => {
  return useContext(CategoryContext);
};

// Create a provider component
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [points, setPoints] = useState(0); // Add points state

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== itemId)
    );
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
        addFavorite,
        removeFavorite,
        selectedItems,
        setSelectedItems,
        points, // Expose points in the context
        incrementPoints, // Expose incrementPoints function to update points
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
