import { nanoid } from "@/lib/utils";
import { CoreMessage } from "ai";
import { text, pgTable, json } from "drizzle-orm/pg-core";

export const chats = pgTable("chats", {
  id: text()
    .$defaultFn(() => nanoid())
    .primaryKey(),
});
export const messages = pgTable("messages", {
  id: text()
    .$defaultFn(() => nanoid())
    .primaryKey(),
  content: json().$type<CoreMessage>().notNull(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  chatId: text().references(() => chats.id, {
    onDelete: "cascade",
  }),
});


export type DBMessage = typeof messages.$inferSelect;