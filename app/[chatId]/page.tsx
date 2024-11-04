import { Chat } from "@/components/chat";
import { getMessages } from "@/lib/api/messages";
import { convertToUIMessages } from "@/lib/utils";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const m = await getMessages(chatId);

  return (
    <div>
      <Link href="/">Back</Link>
      <Chat initialMessages={convertToUIMessages(m)} chatId={chatId} />
    </div>
  );
}
