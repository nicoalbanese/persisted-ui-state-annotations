"use client";

import { createChat } from "@/lib/api/chats";
import { useRouter } from "next/navigation";

export const CreateChat = () => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const newChat = await createChat();
        router.push(`/` + newChat.id);
      }}
    >
      Create chat
    </button>
  );
};