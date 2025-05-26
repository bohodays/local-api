import { readDB, writeDB } from "../dbController.js";
import { v4 } from "uuid";

const getMsgs = () => readDB("messages");
const setMsgs = (data) => writeDB("messages", data);

const messagesRoute = [
  {
    // GET MESSAGES
    method: "get",
    route: "/messages",
    handler: (req, res) => {
      const msgs = getMsgs();
      res.send(msgs);
    },
  },
  {
    // GET MESSAGE
    method: "get",
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find((msg) => msg.id === id);

        if (!msg) throw Error("not found");

        res.send(msg);
      } catch (error) {
        res.status(400).send({ error });
      }
      const msgs = getMsgs();
      res.send(msgs);
    },
  },
  {
    // CREATE MESSAGE
    method: "post",
    route: "/messages",
    handler: ({ body }, res) => {
      const msgs = getMsgs();
      const newMsg = {
        id: v4(),
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      msgs.unshift(newMsg);
      setMsgs(msgs);
      res.send(newMsg);
    },
  },
  {
    // UPDATE MESSAGE
    method: "put",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        const newMsg = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, newMsg);

        setMsgs(msgs);
        res.send(newMsg);
      } catch (error) {
        res.status(500).send({ error });
      }
    },
  },
  {
    // DELETE MESSAGE
    method: "delete",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        msgs.splice(targetIndex, 1);

        setMsgs(msgs);
        res.send(id);
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
];

export default messagesRoute;
