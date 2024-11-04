"use server";

import { chats } from "../db/schema/messages";
import { db } from "@/lib/db"

export const getChats = async () => {
  const c =  await db.select().from(chats);
  console.log(c)
  return c;
};

export const createChat = async () => {
  const [newChat] = await db.insert(chats).values({}).returning();
  return newChat;
};
