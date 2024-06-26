import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default async function getDocumentData({ collectionName, id }) {
  if (!id) return;
  try {
    //const deviceSnapshot = await getDoc(doc(db, collectionName, deviceID));

    const querySnapshot = await getDoc(doc(db, collectionName, id));

    if (querySnapshot.exists()) {
      const deviceData = querySnapshot.data();
      return deviceData;
    } else {
      console.log("Doc not found.");
      return null;
    }
  } catch (error) {
    console.error("Error getting doc attributes:", error);
    return null;
  }
}
