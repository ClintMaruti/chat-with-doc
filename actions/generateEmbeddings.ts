"use server";

import { generateEmbeddingsInPineconeVectoreStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
  auth().protect();
  await generateEmbeddingsInPineconeVectoreStore(docId);
  revalidatePath("/dashboard");
  return { completed: true };
}
