import React, { useRef, useEffect, useState, useCallback } from "react";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import ChatInput from "./components/ChatInput/ChatInput";
import ConversationTabs from './components/ConversationTabs/ConversationTabs';
import ServerConsole from "./components/ServerConsole/ServerConsole";
import styles from "./App.module.css";
import { ChatMessageData, queryData } from "./common/types";
import { botName } from "./common/constants";

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [name, setName] = useState<string>("User");
  const [query, setQuery] = useState<queryData[]>([]);

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
      if (res.reply[3] !== undefined) {
        setName(res.reply[3] !== "" ? res.reply[3] : "User");
      }

      const replyObj: ChatMessageData = {
        id: botName,
        message: reply[1],
        time: new Date()
      };
      setMessages(m => [...m, replyObj]);

      const queryObj: queryData = {
        queryText: reply[0],
        fulfillmentText: reply[1],
        intent: reply[2],
        time: new Date()
      };
      setQuery(q => [...q, queryObj]);
    },
    [fetchMessage]
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const queryEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (queryEndRef.current) {
      queryEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [query]);

  return (
    <div className={styles.page}>
      <div className={styles.tabsBg}>
        <ConversationTabs key='1' name='Profile Bot'>
          recent message recent message recent message recent message recent message recent message recent message recent message recent message
        </ConversationTabs>
      </div>
      <div className={styles.container}>
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
      <div className={styles.console}>
        {query.map((q: any) => (
          <ServerConsole key={q.time.valueOf()} input={q.queryText} output={q.fulfillmentText}>
            {q.intent}
          </ServerConsole>
        ))}
        <div ref={queryEndRef} />
      </div>
    </div>
  );
};

export default App;
