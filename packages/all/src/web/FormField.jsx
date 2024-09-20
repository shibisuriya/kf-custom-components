import React from "react";

import { ApiInspector, Tester } from "helpers";
import styles from "./styles.css";

export default function FormField(props) {
  return (
    <div style={{ border: "2px solid black" }}>
      <div>{props?.field?.name}</div>
      <div className={styles.container}>
        <div>
          <ApiInspector {...props} /> <Tester {...props} />
        </div>
      </div>
    </div>
  );
}
