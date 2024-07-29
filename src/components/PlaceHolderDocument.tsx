"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FrownIcon, PlusCircleIcon } from "lucide-react";
import useSubscription from "../../hooks/useSubscription";

export default function PlaceHolderDocument() {
  const { isOverFileLimit } = useSubscription();
  const router = useRouter();
  const handleClick = () => {
    // Check if user is FREE tier and if they're over the file limit, push them to the upgrade page
    if (isOverFileLimit) {
      router.push("/dashboard/upgrade");
    } else {
      router.push("dashboard/upload");
    }
  };
  return (
    <Button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
    >
      {isOverFileLimit ? (
        <FrownIcon className="h-16 w-16" />
      ) : (
        <PlusCircleIcon className="h-16 w-16" />
      )}
      <p>
        {isOverFileLimit ? "Upgrade to add more documents" : "Add a document"}
      </p>
    </Button>
  );
}
