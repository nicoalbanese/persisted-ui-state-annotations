# Next.js Chat with Persisted State Example

This is a minimal example showcasing how to build a chat interface using Next.js and the [`useChat`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat) hook with persisted state stored in PostgreSQL. The example demonstrates the usage of streaming responses with message annotations using the new [`createDataStreamResponse`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/create-data-stream-response#createdatastreamresponse) function.

## Features

- Chat interface built with Next.js
- Message persistence using PostgreSQL database
- Real-time streaming responses
- Message annotations support
- Uses `useChat` hook for state management

## Getting Started

1. Clone the repository
2. Install dependencies
```sh
pnpm install
```
3. Set up PostgreSQL database and configure environment variables
```sh
pnpm run db:push
```
4. Run the development server
```sh
pnpm run dev
```

## Tech Stack

- Next.js
- PostgreSQL
- Vercel AI SDK
- TypeScript

## Environment Variables

Copy the `.env.example` into a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
```

## License

MIT