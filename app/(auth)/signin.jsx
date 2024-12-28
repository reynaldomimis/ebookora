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
import { getAccount, signIn } from "../../lib/appwrite";
import { useAuth } from "../../context/AuthProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useAuth();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getAccount();
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", err.message || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full p-4">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[150px] h-[85px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-psemibold text-gray-800 mt-10">
            Sign In to Your Account
          </Text>

          {/* Email Field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-10"
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

          {/* Sign In Button */}
          <CButton
            label={isSubmitting ? "Signing In..." : "SIGN IN"}
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-7"
            extraStyles="w-full mt-12 self-center"
          />

          <View className="text-gray-700 justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-700 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/signup"
              className="text-lg font-psemibold text-green-600"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
