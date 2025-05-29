import express from "express";
import cors from "cors";
import messagesRoute from "./routes/messages.js";
import usersRoute from "./routes/users.js";
import { ApolloServer } from "apollo-server-express";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models: {
      messages: "",
      users: "",
    },
  },
});

const app = express(); // Express 애플리케이션 인스턴스 생성
await server.start();
server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    origin: "http://localhost:3000", // CORS 요청을 허용할 출처(프론트엔드 도메인)를 지정한다.
    credentials: true, // 쿠키나 인증 정보를 포함한 요청을 허용한다.
  },
});

await app.listen({ port: 8000 });

console.log(`server listening on 8000...`);
