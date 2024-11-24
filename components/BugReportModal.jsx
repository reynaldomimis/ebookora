import React, { useEffect } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";

const BugReportModal = ({
  visible,
  onClose,
  bugTitle,
  setBugTitle,
  bugDescription,
  setBugDescription,
  onSubmit,
}) => {
  // Clear input fields when modal is closed
  useEffect(() => {
    if (!visible) {
      setBugTitle(""); // Clear the bug title
      setBugDescription(""); // Clear the bug description
    }
  }, [visible, setBugTitle, setBugDescription]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
        }}
      >
        {/* Modal Container */}
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 20,
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: 4 }, // Shadow position
            shadowOpacity: 0.1, // Shadow intensity
            shadowRadius: 10, // Shadow blur
            elevation: 5, // Shadow for Android
          }}
        >
          {/* Modal Header */}
          <View className="px-6 py-4 border-b border-gray-200">
            <Text className="text-center text-xl font-semibold text-gray-800">
              Report a Bug
            </Text>
          </View>

          {/* Modal Content */}
          <View className="px-6 py-4">
            {/* Bug Title Label and Input */}
            <Text className="text-gray-700 mb-2">Title</Text>
            <TextInput
              placeholder="Enter bug title or keywords"
              value={bugTitle}
              onChangeText={setBugTitle}
              multiline
              numberOfLines={4}
              className="border-2 border-gray-300 rounded-lg px-4 py-3 mb-4"
            />

            {/* Bug Description Label and Input */}
            <Text className="text-gray-700 mb-2">Description</Text>
            <TextInput
              placeholder="What bug’s you've encountered?"
              value={bugDescription}
              onChangeText={setBugDescription}
              className="border-2 border-gray-300 rounded-lg px-4 py-3"
              multiline
              numberOfLines={30}
            />
          </View>

          {/* Modal Actions (Buttons side by side) */}
          <View className="flex-row justify-end px-6 py-4 border-t border-gray-200">
            <TouchableOpacity
              onPress={onClose}
              className="px-6 py-2 bg-gray-100 rounded-full mr-4"
            >
              <Text className="text-gray-600 text-lg font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              className="px-6 py-2 bg-blue rounded-full"
            >
              <Text className="text-white text-lg font-medium">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BugReportModal;
