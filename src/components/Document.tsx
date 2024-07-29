"use client";
import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import useSubscription from "../../hooks/useSubscription";
import { useTransition } from "react";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteDocument } from "../../actions/deleteDocument";
export default function Document({
  id,
  name,
  size,
  downloadUrl,
}: {
  id: string;
  name: string;
  size: number;
  downloadUrl: string;
}) {
  const router = useRouter();
  const { hasActiveMemebership } = useSubscription();
  const [isDeleting, startTransition] = useTransition();
  return (
    <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white cursor-pointer group">
      <div
        className="flex-1"
        onClick={() => {
          router.push(`/dashboard/files/${id}`);
        }}
      >
        <p className="font-semibold line-clamp-2">{name}</p>
        {byteSize(size).value}
      </div>
      <div className="flex space-x-2 justify-end">
        <Button
          variant="outline"
          disabled={isDeleting || !hasActiveMemebership}
          onClick={() => {
            const prompt = window.confirm(
              "Are you sure you want to delete this document?"
            );
            if (prompt) {
              startTransition(async () => {
                await deleteDocument(id);
              });
            }
          }}
        >
          <Trash2Icon className="h-6 w-6 text-red-500" />
          {!hasActiveMemebership && (
            <span className="text-red-500 ml-2">PRO Feature</span>
          )}
        </Button>
        <Button variant="outline" asChild>
          <a href={downloadUrl}>
            <DownloadCloud className="h-6 w-6 text-indigo-600" />
          </a>
        </Button>
      </div>
    </div>
  );
}
