import { gql } from "apollo-server-express";
import messageSchema from "./messages.js";
import userSchema from "./users.js";

// linkSchema는 GraphQL 스키마 조합에서 "빈 스키마의 기본 틀을 정의하기 위한 연결 고리" 역할을 합니다.
// apollo-server 또는 apollo-server-express에서는 모든 스키마는 type Query와 type Mutation이 반드시 존재해야 합니다.
// 이 말은 "기존에 정의된 type Query에 필드를 추가하겠다"는 의미입니다.
// 하지만 초기에는 type Query 자체가 없기 때문에 최소한의 기본형을 정의해주는 것이 필요합니다.
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, messageSchema, userSchema];
