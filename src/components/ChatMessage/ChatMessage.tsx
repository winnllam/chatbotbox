import React, { memo, useCallback, useState } from "react";
import styles from "./ChatMessage.module.css";
import { botName } from "../../common/constants";

interface MessageProps {
  name: string;
  time: Date;
  children: string;
}

const ChatMessage = memo<MessageProps>(({ name, time, children }) => {
  const [hidden, setHidden] = useState<String>(styles.hideDate);
  const style = name === botName ? styles.left : styles.right;
  const messageDateTime =
    time.toLocaleDateString() + " at " + time.toLocaleTimeString();
  
  const showTime = useCallback(async () => {
    setHidden(styles.timestamp);
  }, []);

  return (
    <div onClick={showTime}>
      <h5 className={style}>{name}</h5>
      <div className={`${styles.msg} ${style}`}>
        <p className={style}>{children}</p>
      </div>
      <p className={`${style} ${hidden}`}>{messageDateTime}</p>
    </div>
  );
});

export default ChatMessage;
