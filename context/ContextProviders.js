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
  const [favorites, setFavorites] = useState([]); 

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== itemId)
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
