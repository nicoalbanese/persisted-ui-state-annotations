import { tools } from "@/ai/tools";
import { createMessage, getMessages } from "@/lib/api/messages";
import { openai } from "@ai-sdk/openai";
import { StreamData, streamText } from "ai";

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

  const data = new StreamData();
  //
  // Append to general streamed data
  data.append({ test: "initialized calls" });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    async onFinish({ response }) {
      const newChat = await createMessage(
        [message, ...response.messages],
        chatId,
      );

      // message annotation:
      data.appendMessageAnnotation({
        id: newChat.id, // e.g. id from saved DB record
        other: "information",
      });
      // // call annotation (can be any JSON serializable value)
      data.append("call completed");
      // // close the StreamData object
      data.close();
    },
    tools,
  });

  return result.toDataStreamResponse({ data });
  // return result.toDataStreamResponse();
};
