import { useState } from "react";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

const UserIds = ["roy", "jay"];

const getRandomUserId = () => UserIds[Math.round(Math.random())];

const originalMsgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: 50 - i,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (50 - i) * 1000 * 60,
    text: `${50 - i} mock text`,
  }));

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs);
  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((item) => (
          <MsgItem key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
