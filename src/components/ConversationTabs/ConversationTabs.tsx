import React, { memo, useCallback, useState } from "react";
import styles from "./ConversationTabs.module.css";

interface TabProps {
  name: string;
  children: string; //most recent message and time for each bot :)
} //onclick this tab it opens the chat

const ConversationTabs = memo<TabProps>(({ name, children }) => {
  const [active, setActive] = useState<String>(styles.inactive);

  const showActive = useCallback(async () => {
      setActive(active === styles.inactive ? styles.active : styles.active);
  }, [active]);

  const sendActive = useCallback(async () => {
    
  }, []);

  return (
    <div className={`${styles.tab} ${active}`} onClick={showActive}>
      <p className={styles.botName}>{name}</p>
      <div className={styles.textBox}>
        <p className={styles.recent}>{children}</p>
      </div>
    </div>
  );
});

export default ConversationTabs;
