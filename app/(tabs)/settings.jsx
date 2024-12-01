import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BugReportModal from "../../components/BugReportModal";
import Constants from "expo-constants";
import { router, useNavigation } from "expo-router";
import { signOut } from "../../lib/appwrite";

// Sample settings list with titles and descriptions
const settingsList = [
  { id: "1", title: "Report Bug" },
  { id: "2", title: "Changelog", description: "What's new in this version?" },
  {
    id: "3",
    title: "About App",
    description: "Explore about the Ebookora: Free Ebooks Online",
  },
  { id: "4", title: "Special Credits", description: "List of contributors" },
  { id: "5", title: "Log Out" },
];

// Sample changelog data
const changelogData = [
  {
    version: "v2.1.0",
    date: "2024-11-20",
    updates: [
      "Improved UI for bug report submission.",
      "Fixed issue with text formatting in the bug description field.",
      "Optimized loading times for viewing reports.",
      "Bug fixes and performance improvements.",
    ],
  },
  {
    version: "v2.0.0",
    date: "2024-10-15",
    updates: [
      "Introduced a new bug report feature.",
      "Added special credits section to honor contributors.",
      "Enhanced security measures for handling reports.",
      "Fixed minor UI bugs and updated app design.",
    ],
  },
];

// Sample special credits data
const specialCreditsData = [
  { name: "John Doe", contribution: "App development and bug fixing" },
  { name: "Jane Smith", contribution: "UI/UX Design" },
  { name: "Carlos Perez", contribution: "Quality Assurance and Testing" },
  { name: "Alice Green", contribution: "Backend API development" },
  { name: "Bob White", contribution: "Security enhancements and updates" },
];

const SettingsItem = ({
  title,
  description,
  isExpanded,
  onPress,
  children,
}) => (
  <Pressable
    className="p-4 bg-[#f8f8f8] rounded-md mb-3 shadow-md"
    onPress={onPress}
  >
    <View className="flex-row justify-between items-center">
      <Text className="text-lg font-semibold text-[#333]">{title}</Text>
      {description && (
        <Icon
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#21A0A5"
        />
      )}
    </View>
    {isExpanded && description && (
      <Text className="text-sm text-[#555] mt-2">{description}</Text>
    )}
    {isExpanded && children}
  </Pressable>
);

const Settings = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const navigation = useNavigation();

  const handlePress = async (id) => {
    if (id === "1") {
      setModalVisible(true);
    } else if (id === "5") {
      await handleSignOut();
    } else {
      setExpandedItem(expandedItem === id ? null : id);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // After successful sign-out, navigate to login screen
      navigation.navigate("signin"); // Adjust the name of the login screen if necessary
    } catch (error) {
      console.error("Sign out failed:", error);
      // You can show an alert or error message to the user
    }
  };


  const handleSubmitBug = () => {
    console.log("Bug Submitted:", { bugTitle, bugDescription });
    setBugTitle("");
    setBugDescription("");
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Toolbar */}
      <View className="bg-blue pt-16 pb-4 mb-4">
        <View className="flex-row items-center justify-between px-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-center flex-1 text-white pr-8">
            Settings
          </Text>
        </View>
      </View>

      {/* Image and Version */}
      <View className="items-center my-8">
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="text-md text-gray-600 mt-2">
          Version {Constants.systemVersion}
        </Text>
      </View>

      {/* About Section */}
      <Text className="text-lg font-semibold text-blue mb-3 mt-4 px-4">
        About
      </Text>

      {/* Settings List */}
      <ScrollView className="px-4">
        {settingsList.map((item) => (
          <SettingsItem
            key={item.id}
            title={item.title}
            description={item.description}
            isExpanded={expandedItem === item.id}
            onPress={() => handlePress(item.id)}
          >
            {/* Changelog */}
            {item.id === "2" && expandedItem === "2" && (
              <View className="mt-4">
                {changelogData.map((change) => (
                  <View key={change.version} className="mb-3">
                    <Text className="text-lg font-semibold text-[#333]">
                      {change.version} - {change.date}
                    </Text>
                    {change.updates.map((update, index) => (
                      <Text key={index} className="text-sm text-[#555] mt-1">
                        - {update}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Special Credits */}
            {item.id === "4" && expandedItem === "4" && (
              <View className="mt-4 ">
                {specialCreditsData.map((credit, index) => (
                  <View key={index} style={styles.creditContainer}>
                    <Text style={styles.name}>{credit.name}</Text>
                    <Text style={styles.contribution}>
                      {credit.contribution}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {/* About App */}
            {item.id === "3" && expandedItem === "3" && (
              <View className="mt-4">
                <Text className="text-sm text-[#555]">
                  eBookora: Free Ebooks Course is an app designed to manage and
                  report bugs efficiently. It allows users to submit bug reports
                  and track app updates and changes.
                </Text>
              </View>
            )}
          </SettingsItem>
        ))}
      </ScrollView>

      {/* Bug Report Modal */}
      <BugReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        bugTitle={bugTitle}
        setBugTitle={setBugTitle}
        bugDescription={bugDescription}
        setBugDescription={setBugDescription}
        onSubmit={handleSubmitBug}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  creditContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contribution: {
    fontSize: 14,
    color: "#555",
  },
});

export default Settings;
