import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./ChatBox.module.css";
import { ChatMessageData } from "../../common/types";
import { botName } from '../../common/constants';

const ChatBox = memo(() => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  const sendMessage = useCallback(
    async (message: ChatMessageData) => {
      setMessages(m => [...m, message]);
    },
    []
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div className={styles.chatBox}>
        <ChatMessage
          key={new Date().valueOf()}
          name={botName}
          time={new Date()}
        >
          Hello!
        </ChatMessage>
        {messages.map((m: any) => (
          <ChatMessage key={m.time.valueOf()} name={m.id} time={m.time}>
            {m.message}
          </ChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
});

export default ChatBox;
