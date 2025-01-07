import { tools } from "@/ai/tools";
import { createMessage, getMessages } from "@/lib/api/messages";
import { openai } from "@ai-sdk/openai";
import { createDataStreamResponse, streamText } from "ai";

export const POST = async (request: Request) => {
  const {
    message,
    chatId,
  }: {
    message: { content: string; role: "user"; id: string };
    chatId: string;
  } = await request.json();

  // explore creating an id here and then sending it to the client
  // also explore patching useChat to pass a function to generateIds

  const messages = (await getMessages(chatId))
    .map((m) => m.content)
    .concat(message);
  console.log(messages);

  return createDataStreamResponse({
    execute: async (dataStream) => {
      dataStream.writeData({ test: "initialized calls" });
      const result = streamText({
        model: openai("gpt-4o-mini"),
        messages,
        async onFinish({ response }) {
          const newChat = await createMessage(
            [message, ...response.messages],
            chatId,
          );

          // message annotation:
          dataStream.writeMessageAnnotation({
            id: newChat.id, // e.g. id from saved DB record
            other: "information",
          });
        },
        tools,
      });
      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });
};
