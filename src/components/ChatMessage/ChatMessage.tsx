import React, { memo } from "react";
import styles from "./ChatMessage.module.css";
import { botName } from "../../common/constants";

interface MessageProps {
  name: string;
  time: Date;
  children: string;
}

const ChatMessage = memo<MessageProps>(({ name, time, children }) => {
  const style = name === botName ? styles.left : styles.right;
  const messageDateTime =
    time.toLocaleDateString() + " at " + time.toLocaleTimeString();

  return (
    <div>
      <h5 className={style}>{name}</h5>
      <div className={`${styles.msg} ${style}`}>
        <p className={style}>{children}</p>
      </div>
      <p className={`${styles.timestamp} ${style}`}>{messageDateTime}</p>
    </div>
  );
});

export default ChatMessage;
