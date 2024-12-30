import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
 
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to subscribe to a collection and handle events
export const subscribeToCollection = (onCreate, onDelete) => {
  const unsubscribe = client.subscribe(
    `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.bookmarksCollectionId}.documents`,
    (response) => {
      // Handle create event
      if (
        response.events.includes("databases.*.collections.*.documents.*.create")
      ) {
        const newMessage = response.payload;
        console.log("Data new message", newMessage);
        if (onCreate) onCreate(newMessage);
      }

      // Handle delete event
      if (
        response.events.includes("databases.*.collections.*.documents.*.delete")
      ) {
        console.log("Data response delete", response.payload.$id);
        if (onDelete) onDelete(response.payload.$id);
      }
    }
  );

  // Return the unsubscribe function for cleanup
  return unsubscribe;
};

// Register user
export async function createUser(email, password, username) {
  try {
    // Create a new account in Appwrite
    const newAccount = await account.create(
      ID.unique(), // Unique ID for the account
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Failed to create a new account");
    }

    // Generate avatar URL from username
    const avatarUrl = avatars.getInitials(username);

    // Sign in the user after account creation
    await signIn(email, password);

    // Create a new user document in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    // Return the newly created user document
    return newUser;
  } catch (error) {
    // Throw a more descriptive error if something goes wrong
    throw new Error(`Error creating user: ${error.message}`);
  }
}
// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all books Posts
export async function getAllBooks() {
  try {
    const books = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ebooksCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return books.documents;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch books.");
  }
}
// Function to fetch categories
export async function getAllCategories() {
  try {
    const books = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    return books.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllNotifications() {
  try {
    const notif = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.announceCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return notif.documents;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch books.");
  }
}

export const updateIsReadNotificationByUserId = async (userId) => {
  try {
    console.log(`userId: ${userId}`);
    // Step 1: Query the documents to find the document with the given userId
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userId)] // Adjust the field to your specific use case
    );

    // If no documents found, exit
    if (documents.total === 0) {
      console.warn(`No documents found for userId: ${userId}`);
      return;
    }

    // Step 2: Update the document(s)
    const updatePromises = documents.documents.map((doc) =>
      databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        doc.$id, // Use the document ID for the update
        { isReadNotification: true }
      )
    );

    // Wait for all update promises to resolve
    const responses = await Promise.all(updatePromises);
    console.log("Document(s) updated:", responses);
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const getUnreadNotificationsCount = async () => {
  try {
    // Query to get documents where isReadNotification is false or not true
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("isReadNotification", false)]
    );
    const unreadCount = documents.total;
    return unreadCount;
  } catch (error) {
    console.error("Error getting unread notifications count:", error);
    return 0;
  }
};

//Add bookmark data
export async function addBookmark(userId, pdfId) {
  try {
    // Fetch existing bookmarks for the user and pdfId
    const existingBookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      [Query.equal("userId", userId), Query.equal("pdfId", pdfId)]
    );

    // If the bookmark already exists, show an alert and return early
    if (existingBookmarks.documents.length > 0) {
      Alert.alert("Bookmark Exists", "This book is already bookmarked!");
      return;
    }

    // Create the bookmark if it doesn't exist
    const bookmark = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      ID.unique(),
      {
        userId: userId,
        pdfId: pdfId,
      }
    );
    return bookmark;
  } catch (error) {
    throw new Error("Failed to add bookmark.");
  }
}

// Function to remove a bookmark (delete the document)
export async function removeBookmark(userId, pdfId) {
  try {
    // Find the bookmark document by userId and pdfId
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      [Query.equal("userId", userId), Query.equal("pdfId", pdfId)]
    );

    if (documents.total === 0) {
      return null;
    }

    // If multiple documents are found, log a warning or handle as necessary
    if (documents.total > 1) {
      console.warn("Multiple bookmarks found, deleting the first one.");
    }

    // Delete the found bookmark by using its document ID
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      documents.documents[0].$id
    );
    return { message: "Bookmark removed successfully." };
  } catch (error) {
    console.error("Error removing bookmark:", error); // Log the detailed error
    throw new Error("Failed to remove bookmark.");
  }
}

// Fetch user bookmarks by userId and match them with books
export async function getBooksByBookmarks(userId) {
  try {
    // Fetch bookmarks for the given userId
    const bookmarks = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookmarksCollectionId,
      [Query.equal("userId", userId)]
    );

    if (
      !bookmarks ||
      !bookmarks.documents ||
      bookmarks.documents.length === 0
    ) {
      return [];
    }
    const bookmarkIds = bookmarks.documents.map((bookmark) => bookmark.pdfId);

    // Fetch books that match the pdfId in the bookmarks
    const books = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ebooksCollectionId,
      [Query.equal("$id", bookmarkIds), Query.orderDesc("$createdAt")]
    );

    return books.documents;
  } catch (error) {
    throw error;
  }
}

// export async function updateIsReadNotificationByUserId(userId, isRead) {
//   try {
//     console.log("Updating notification for user ID:", userId);

//     // Directly update the document using its $id (userId)
//     const response = await databases.updateDocument(
//       appwriteConfig.databaseId, // Corrected to pass the database ID
//       appwriteConfig.userCollectionId, // Corrected to pass the collection ID
//       documentId: userId,
//       data: { isReadNotification: isRead }
//     );

//     console.log("Notification updated successfully:", response);
//     return response;
//   } catch (error) {
//     console.error(`Error updating notification for user ID ${userId}:`, error);
//     throw error;
//   }
// }
// export const updateIsReadNotificationByUserId = async () => {
//   try {
//     const response = await databases.updateDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       "676fc9d70036dec0a6f9",
//       { isReadNotification: true }
//     );
//     console.log("Document updated:", response);
//   } catch (error) {
//     console.error("Error updating document:", error);
//   }
// };

//this function is admin user to update notif all
// export const updateAllNotificationsToRead = async () => {
//   try {
//     // Fetch all documents in the collection
//     const documents = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId
//     );

//     if (documents.total === 0) {
//       console.log("No documents found.");
//       return;
//     }

//     // Update all the documents to set isReadNotification to true
//     const updatePromises = documents.documents.map(doc =>
//       databases.updateDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.userCollectionId,
//         doc.$id,
//         { isReadNotification: true }
//       )
//     );

//     // Wait for all updates to complete
//     const responses = await Promise.all(updatePromises);
//     console.log("All notifications updated:", responses);

//     return responses;
//   } catch (error) {
//     console.error("Error updating notifications:", error);
//     throw error;
//   }
// };

// export async function creatArray(categoriesString) {
//   try {
//     const cat = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.categoriesCollectionId,
//       ID.unique(),
//       {
//         categories: categoriesString, // Store as a string
//       }
//     );
//     console.log("Document created:", cat);
//   } catch (error) {
//     console.error("Error creating document:", error);
//   }

// // Upload File
// export async function uploadFile(file, type) {
//   if (!file) return;

//   const { mimeType, ...rest } = file;
//   const asset = { type: mimeType, ...rest };

//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       asset
//     );

//     const fileUrl = await getFilePreview(uploadedFile.$id, type);
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get File Preview
// export async function getFilePreview(fileId, type) {
//   let fileUrl;

//   try {
//     if (type === "video") {
//       fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
//     } else if (type === "image") {
//       fileUrl = storage.getFilePreview(
//         appwriteConfig.storageId,
//         fileId,
//         2000,
//         2000,
//         "top",
//         100
//       );
//     } else {
//       throw new Error("Invalid file type");
//     }

//     if (!fileUrl) throw Error;

//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Create Video Post
// export async function createVideoPost(form) {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFile(form.thumbnail, "image"),
//       uploadFile(form.video, "video"),
//     ]);

//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       ID.unique(),
//       {
//         title: form.title,
//         thumbnail: thumbnailUrl,
//         video: videoUrl,
//         prompt: form.prompt,
//         creator: form.userId,
//       }
//     );

//     return newPost;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get all video Posts
// export async function getAllPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts created by user
// export async function getUserPosts(userId) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.equal("creator", userId)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts that matches search query
// export async function searchPosts(query) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.search("title", query)]
//     );

//     if (!posts) throw new Error("Something went wrong");

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get latest created video posts
// export async function getLatestPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.orderDesc("$createdAt"), Query.limit(7)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
