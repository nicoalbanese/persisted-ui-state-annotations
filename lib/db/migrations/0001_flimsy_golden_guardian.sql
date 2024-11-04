ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_chats_id_fk";
--> statement-breakpoint
ALTER TABLE "chats" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
