"use server";

import pineconeClient from "@/lib/pinecone";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getStorage } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { adminDb, adminStorage } from "../firebaseAdmin";
import { indexName } from "@/lib/langchain";

export async function deleteDocument(docId: string) {
  auth().protect();
  const { userId } = await auth();

  // Delete the document from the database
  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .delete();

  // Delete from firebase storage
  await adminStorage
    .bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(`users/${userId}/files/${docId}`)
    .delete();

  // Delete all embeddings associated with the documents
  const index = await pineconeClient.index(indexName);
  await index.namespace(docId).deleteAll();

  // Revalidate the dashboard page to ensure the documents are upto date
  revalidatePath("/dashboard");
}
