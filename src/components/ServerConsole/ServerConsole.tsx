import React, { memo } from "react";
import styles from "./ServerConsole.module.css";
import { queryData } from "../../common/types";

interface ServerProps {
  input: string;
  output: string;
  children: queryData[];
}

const ServerConsole = memo<ServerProps>(({ input, output, children }) => {
  return (
    <div className={styles.log}>
      <p><b>Input:</b> {input}</p>
      <p><b>Output:</b> {output}</p>
      <p><b>Intent:</b> {children}</p>
    </div>
  );
});

export default ServerConsole;
