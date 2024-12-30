import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";
import {
  addReport,
  getAbout,
  getAllLogs,
  getCollaborators,
  signOut,
} from "../../lib/appwrite";
import { useAuth } from "../../context/AuthProvider";
import { formatToLongDate } from "../search/util/utilHelper";
import { images } from "../../constants";

// Sample settings list with titles and descriptions
const settingsList = [
  { id: "1", title: "Report Bug" },
  { id: "2", title: "Changelog", description: "What's new in this version?" },
  {
    id: "3",
    title: "About App",
  },
  { id: "4", title: "Special Credits", description: "List of contributors" },
  { id: "5", title: "Log Out" },
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
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const { user, setUser, setIsLogged } = useAuth();
  const [changelogData, setChangelogData] = useState([]);
  const [collaborator, setCollaborator] = useState([]);
  const [about, setAbout] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const logs = await getAllLogs();
        if (!logs || logs.length === 0) {
          setChangelogData([]);
          return;
        }
        let processedCategories = [];
        logs.forEach((item) => {
          if (item.description) {
            processedCategories.push({
              date: item.$createdAt,
              version: item.version,
              title: item.title,
              description: item.description,
            });
          }
        });
        setChangelogData(processedCategories);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const ab = await getAbout();
        const collab = await getCollaborators();
        setAbout(ab);
        setCollaborator(collab);
      } catch (error) {
        console.error("Failed to fetch about or collaborators:", error);
      }
    };

    fetchPost();
  }, []);
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
      setUser(null);
      setIsLogged(false);
      router.replace("/signin");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  // Function to handle form submission and add bug report
  const handleSubmitBug = async () => {
    try {
      // Prepare the bug report data
      const bugReport = {
        title: bugTitle,
        description: bugDescription,
        userId: user?.$id,
        status: "pending",
      };
      const add = await addReport(bugReport);
      setBugTitle("");
      setBugDescription("");
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to submit the bug report:", error);
    }
  };
  return (
    <View className="flex-1 bg-white">
      {/* Toolbar */}
      <View className="bg-blue pt-16 pb-4 mb-4">
        <View className="flex-row items-center justify-between px-4">
          <TouchableOpacity onPress={() => router.back()}>
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
          source={images.logo}
          style={{ width: 100, height: 100, borderRadius: 50 }}
          resizeMode="stretch"
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
                {Array.isArray(changelogData) && changelogData.length > 0 ? (
                  changelogData.map((change, index) => (
                    <View key={index} className="mb-3">
                      <Text className="text-lg font-semibold text-[#333]">
                        {change.version} - {formatToLongDate(change.date)}
                      </Text>
                      {/* Check if description is an array */}
                      {Array.isArray(change.description) &&
                      change.description.length > 0 ? (
                        change.description.map((update, updateIndex) => (
                          <Text
                            key={updateIndex}
                            className="text-sm text-[#555] mt-1"
                          >
                            - {update.trim()}
                          </Text>
                        ))
                      ) : (
                        <Text className="text-sm text-[#555] mt-1">
                          No description available
                        </Text>
                      )}
                    </View>
                  ))
                ) : (
                  <Text className="text-sm text-[#555]">
                    No changelog available.
                  </Text>
                )}
              </View>
            )}

            {/* Special Credits */}
            {item.id === "4" && expandedItem === "4" && (
              <View className="mt-4 ">
                {collaborator.length > 0 ? (
                  collaborator.map((credit, index) => (
                    <View key={index} style={styles.creditContainer}>
                      <Text style={styles.name}>{credit.name}</Text>
                      <Text style={styles.contribution}>
                        {credit.contribution}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-sm text-[#555]">
                    No special credits available.
                  </Text>
                )}
              </View>
            )}

            {/* About App */}
            {item.id === "3" && expandedItem === "3" && (
              <View className="mt-4">
                <Text className="text-sm text-[#555]">
                  {about[0].description}
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
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contribution: {
    fontSize: 14,
    color: "#555",
  },
});

export default Settings;
