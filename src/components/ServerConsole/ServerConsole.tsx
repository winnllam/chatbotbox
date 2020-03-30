import React, { memo, useRef, useEffect } from "react";
import styles from "./ServerConsole.module.css";

const ServerConsole = memo(() => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.console}>
      <div ref={endRef} />
    </div>
  );
});

export default ServerConsole;
