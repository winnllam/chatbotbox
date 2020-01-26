import React from "react";
import styles from "./ChatInput.module.css";

interface InputProps {
  userId: string;
  messages: any[];
  sendMessage: (message: any) => void;
}

class ChatInput extends React.Component<InputProps> {
  onSubmit = (e: any) => {
    e.preventDefault(); //will not reload the page

    const message = document.querySelector("#txt") as HTMLInputElement;

    const messageObj = {
      Who: this.props.userId,
      What: message.value,
      When: new Date().valueOf() // for numbers
    };

    if (message.value !== "") {
      this.props.messages.push(messageObj);
      this.props.sendMessage(messageObj);

      //clear input box
      var clear = document.querySelector("#txt") as HTMLInputElement;
      clear.value = "";
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className={styles.inputFrame}>
        <input
          id="txt"
          type="text"
          className={styles.chatInput}
          placeholder="Message Here..."
          autoComplete="off"
        ></input>
        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    );
  }
}

export default ChatInput;
