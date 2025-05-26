import express from "express";
import cors from "cors";
import messagesRoute from "./routes/messages.js";
import usersRoute from "./routes/users.js";

const app = express(); // Express 애플리케이션 인스턴스 생성

app.use(express.urlencoded({ extended: true }));
// URL-encoded 데이터를 파싱하기 위한 미들웨어 설정
// extended: true는 qs 라이브러리를 사용해 중첩된 객체 표현을 허용한다.

app.use(express.json());
// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어를 설정한다.

app.use(
  cors({
    origin: "http://localhost:3000", // CORS 요청을 허용할 출처(프론트엔드 도메인)를 지정한다.
    credentials: true, // 쿠키나 인증 정보를 포함한 요청을 허용한다.
  })
);
// CORS 미들웨어를 설정해서 프론트엔드와 백엔드가 다른 도메인일 때에도 통신할 수 있도록 한다.

const routes = [...messagesRoute, ...usersRoute];
console.log({ routes });

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.listen(8000, () => {
  console.log(`server listening on 8000...`);
});
