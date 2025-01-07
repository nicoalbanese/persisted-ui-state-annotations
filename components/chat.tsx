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
    maxSteps: 3,
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
          // const messageId =
          //   (m.annotations?.[0] as { id: string })?.id ??
          //   (m as { id: string }).id;

          if (m.content.length === 0 && m.toolInvocations?.length === 0)
            return null;
          return (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                {m.toolInvocations && m.toolInvocations.length > 0 ? (
                  <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
                ) : (
                  <p>{m.content}</p>
                )}
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
