import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getRealtimeDocumentData = (
  { collectionName, deviceID },
  callback
) => {
  if (!deviceID) return;

  try {
    const docRef = doc(db, collectionName, deviceID);

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const deviceData = docSnapshot.data();
        callback(deviceData);
      } else {
        console.log("Doc not found.");
        callback(null);
      }
    });

    // Return the unsubscribe function to allow unsubscribing from updates
    return unsubscribe;
  } catch (error) {
    console.error("Error getting doc attributes:", error);
    callback(null);
  }
};
