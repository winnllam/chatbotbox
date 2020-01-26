import React from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./ChatBox.module.css";

class ChatBox extends React.Component {
  messagesEndRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.messagesEndRef = React.createRef();
  }

  state = {
    userId: Math.round(Math.random() * 1000000).toString(),
    messages: []
  };

  sendMessage = (message: any) => {
    console.log("sendMessage", message); //object
    console.log(this.state.messages); //string array
    this.setState({ messages: this.state.messages });
  };

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current!.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { sendMessage, state } = this; //pass props to respective components

    return (
      <div>
        <div className={styles.chatBox}>
          <h4>Assistant</h4>
          <p>Hello, what's your name?</p>
          <div>
            {this.state.messages.map((m: any) => {
              return (
                <ChatMessage key={m.When} name={m.Who} time={m.When}>
                  {m.What}
                </ChatMessage>
              );
            })}
          </div>
          <div ref={this.messagesEndRef} />
        </div>
        <div>
          <ChatInput
            userId={state.userId}
            messages={state.messages}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default ChatBox;
