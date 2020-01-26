import React from "react";
import styles from "./ChatMessage.module.css";

interface MessageProps {
  name: string;
  time: string;
  children: string;
}

class ChatMessage extends React.Component<MessageProps> {
  render() {
    const messageDate = new Date(this.props.time);
    const messageDateTime =
      messageDate.toLocaleDateString() +
      " at " +
      messageDate.toLocaleTimeString();

    return (
      <div>
        <h5>User #{this.props.name}</h5>
        <div className={styles.userMsg}>
          <p className={styles.msgText}>{this.props.children}</p>
        </div>
        <p className={styles.timestamp}>{messageDateTime}</p>
      </div>
    );
  }
}

export default ChatMessage;
