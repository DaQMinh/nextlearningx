import { db } from "@/firebase/config";
import { collection, getDocs, DocumentSnapshot } from "firebase/firestore";

interface Part {
  id: string;
  data: { [key: string]: any }
}

interface Subcourse {
  id: string;
  data: { [key: string]: any }
  parts: Part[];
}

export interface Course {
  id: string;
  data: any;
  subcourses?: Subcourse[];
}

export async function getVideoData() {
  const querySnapshot = await getDocs(collection(db, "courses"));
  const result: Course[] = [];

  // Create an array of promises for subcourse queries
  const subcoursePromises = querySnapshot.docs.map(async (doc: DocumentSnapshot) => {
    const subSnapshot = await getDocs(collection(db, `courses/${doc.id}/subcourses/`));
    const subcourses: Subcourse[] = [];

    for (const subDoc of subSnapshot.docs) {
      const partsSnapshot = await getDocs(collection(db, `courses/${doc.id}/subcourses/${subDoc.id}/parts/`));
      const parts: Part[] = [];
      
      partsSnapshot.forEach((partDoc) => {
        parts.push({ id: partDoc.id, data: partDoc.data() });
      });

      subcourses.push({ id: subDoc.id, data: subDoc.data(), parts: parts });
    }

    // Push the subcourses into the result for the current course
    result.push({ id: doc.id, data: doc.data(), subcourses: subcourses });
  });

  // Wait for all subcourse queries to complete
  await Promise.all(subcoursePromises);
  return result
}