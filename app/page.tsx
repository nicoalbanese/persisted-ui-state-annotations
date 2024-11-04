import { CreateChat } from "@/components/create-chat";
import { getChats } from "@/lib/api/chats";
import Link from "next/link";

export default async function Chat() {
  const chats = await getChats();
  console.log(chats);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <h3>Chats</h3>
      <CreateChat />
      {chats.length > 0 ? (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link href={`/${chat.id}`}>{chat.id}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found</p>
      )}
    </div>
  );
}
