import React from "react";
import styles from "./App.module.css";
import ChatBox from "./components/ChatBox/ChatBox";

const App: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.title}>
          <h3>
            <code>Chat Time</code>
          </h3>
        </header>
        <ChatBox />
      </div>
    </div>
  );
};
export default App;
