import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { CategoryProvider } from "../context/ContextProviders";
import { AuthProvider } from "../context/AuthProvider";
import { fonts } from "../constants";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts(fonts);

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
      throw error;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <CategoryProvider>
        <Stack>
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
          <Stack.Screen name="view_course" options={{ headerShown: false }} />
          <Stack.Screen name="view_pdf" options={{ headerShown: false }} />
          <Stack.Screen name="seemore" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false }}
          />
        </Stack>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default RootLayout;
