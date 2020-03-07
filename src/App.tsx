import React from "react";
import styles from "./App.module.css";
import ChatBox from "./components/ChatBox/ChatBox";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.title}>
        <h3>
          <code>Assistant Chat</code>
        </h3>
      </header>
      <div>
        <ChatBox />
      </div>
    </div>
  );
};
export default App;
