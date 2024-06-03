import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function getAllDocumentIds({ collectionName }) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documentIds = [];

    querySnapshot.forEach((doc) => {
      documentIds.push(doc.id);
    });

    return documentIds;
  } catch (error) {
    console.error("Error fetching document IDs:", error);
    return [];
  }
}
