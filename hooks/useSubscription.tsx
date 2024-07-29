"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

// number of docs the user is allowed to have
export const PRO_LIMIT = 100;
export const FREE_LIMIT = 3;

export default function useSubscription() {
  const [hasActiveMemebership, setHasActiveMembership] = useState(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  const { user } = useUser();

  const [snapshot, loading, error] = useDocument(
    user && doc(db, "users", user.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Listen to the users files collection
  const [filesSnapshot, filesloading] = useCollection(
    user && collection(db, "users", user.id, "files")
  );

  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data();
    if (!data) return;

    setHasActiveMembership(data.hasActiveMembership);
  }, [snapshot]);

  useEffect(() => {
    if (!filesSnapshot || hasActiveMemebership === null) return;

    const files = filesSnapshot.docs;
    const userLimit = hasActiveMemebership ? PRO_LIMIT : FREE_LIMIT;

    console.log("Checking if user is over file limit", files.length, userLimit);

    setIsOverFileLimit(files.length >= userLimit);
  }, [filesSnapshot, hasActiveMemebership, PRO_LIMIT, FREE_LIMIT]);

  return {
    hasActiveMemebership,
    loading,
    error,
    isOverFileLimit,
    filesloading,
  };
}
