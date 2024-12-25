import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CButton from "../../components/CButton";
import { Link, useRouter } from "expo-router";
import { createUser } from "../../lib/appwrite";

const Signup = () => {
  const { setUser, setIsLogged } = useAuth();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser("Rey");
      console.log("Result ", result);
      setIsLogged(true);
      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", "Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full p-4">
      {/* KeyboardAvoidingView to adjust for keyboard on iOS and Android */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          {/* Logo Image */}
          <Image
            source={images.logo}
            className="w-[150px] h-[85px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-psemibold text-gray-800 mt-10">
            Create an Account
          </Text>

          {/* Form Fields */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            keyboardType="text"
            placeholder="Enter your username"
            placeholderTextColor="gray"
          />

          {/* Email Field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="gray"
          />

          {/* Password Field */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            placeholder="Enter your password"
            placeholderTextColor="gray"
          />

          {/* Sign Up Button */}
          <CButton
            label={isSubmitting ? "Signing Up..." : "SIGN UP"}
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-7"
            extraStyles="w-full mt-12 self-center"
          />

          {/* Sign In Link */}
          <View className="text-gray-700 justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-700 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/signin"
              className="text-lg font-psemibold text-green-600"
            >
              Sign In
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
