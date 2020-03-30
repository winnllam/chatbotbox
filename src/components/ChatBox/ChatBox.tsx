import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./ChatBox.module.css";
import { ChatMessageData } from "../../common/types";
import { botName } from "../../common/constants";

const ChatBox = memo(() => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [name, setName] = useState<string>('User');

  const fetchMessage = useCallback(async (message: ChatMessageData) => {
    const res = await fetch(`http://localhost:5000/query`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ message })
    });
    return res.json();
  }, []);

  const sendMessage = useCallback(
    async (message: ChatMessageData) => {
      setMessages(m => [...m, message]);

      const res = await fetchMessage(message);
      let reply = res.reply;
      if (Array.isArray(res.reply)){
        reply = res.reply[0];
        setName(res.reply[1] !== '' ? res.reply[1] : 'User');
      } 

      const replyObj: ChatMessageData = {
        id: botName,
        message: reply,
        time: new Date()
      };

      setMessages(m => [...m, replyObj]);
    },
    [fetchMessage]
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
        {messages.map((m: any) => (
          <ChatMessage key={m.time.valueOf()} name={m.id} time={m.time}>
            {m.message}
          </ChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput sendMessage={sendMessage} name={name} />
    </div>
  );
});

export default ChatBox;
