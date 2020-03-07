import React, { memo, useCallback, useState, ChangeEvent } from "react";
import styles from "./ChatInput.module.css";
import { ChatMessageData } from "../../common/types";

interface InputProps {
  sendMessage: (message: any) => void;
}

const ChatInput = memo<InputProps>(({ sendMessage }) => {
  const [value, setValue] = useState('');

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const messageObj: ChatMessageData = {
        id: "User",
        message: value,
        time: new Date()
      };

      if (value !== "") {
        sendMessage(messageObj);
        setValue('');
      }
    },
    [sendMessage, value]
  );

  return (
    <form onSubmit={onSubmit} className={styles.inputFrame}>
      <input
        id="input"
        className={styles.chatInput}
        placeholder="Message Here..."
        value={value}
        onChange={handleInput}
        autoComplete="off"
      ></input>
      <button type="submit" className={styles.submitBtn}>
        Send
      </button>
    </form>
  );
});

export default ChatInput;
