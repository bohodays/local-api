import React from "react";

const MsgItem = ({ userId, timestamp, text }) => {
  return (
    <li className="message__item">
      <h3>
        {userId}{" "}
        <sub>
          {new Date(timestamp).toLocaleString("ko-kr", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </sub>
      </h3>

      {text}
    </li>
  );
};

export default MsgItem;
