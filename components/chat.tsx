"use client";

import { Message, useChat } from "ai/react";

export function Chat({
  initialMessages,
  chatId,
}: {
  initialMessages?: Message[];
  chatId: string;
}) {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    initialMessages: initialMessages ?? [],
    id: chatId,
    experimental_prepareRequestBody: ({ messages }) => {
      const lastMessage = messages[messages.length - 1];
      return {
        chatId,
        message: {
          role: lastMessage.role,
          content: lastMessage.content,
          id: lastMessage.id,
        },
      };
    },
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col w-full max-w-md pb-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => {
          const messageId =
            (m.annotations?.[0] as { id: string })?.id ??
            (m as { id: string }).id;
          return (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>{m.content}</p>
                <pre>
                  {JSON.stringify(
                    {
                      tools: m.toolInvocations ?? [],
                      messageId,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:text-gray-900 bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
