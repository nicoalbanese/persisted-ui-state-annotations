"use server";

import { CoreMessage } from "ai";
import { db } from "../db";
import { messages } from "../db/schema/messages";
import { eq } from "drizzle-orm";

export const createMessage = async (
  newMessages: (CoreMessage & { id?: string })[],
  chatId: string,
) => {
  const newMessage = await db
    .insert(messages)
    .values(newMessages.map((m) => ({ content: m, chatId: chatId, id: m.id })))
    .returning();
  const lastMessage = newMessage[1];
  return lastMessage;
};

export const getMessages = async (chatId: string) => {
  return await db.select().from(messages).where(eq(messages.chatId, chatId));
};
