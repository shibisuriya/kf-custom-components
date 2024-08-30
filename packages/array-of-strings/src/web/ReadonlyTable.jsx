import React from "react";
import Dummy from "./FormField.jsx";

function ReadonlyTable(props) {
  return (
    <div>
      <h5>ReadonlyTable</h5>
      <div>
        <Dummy {...props} />
      </div>
    </div>
  );
}

export default ReadonlyTable;
