import React from "react";
import Dummy from "./FormField.jsx";

function EditableTable(props) {
  return (
    <div>
      <h5>EditableTable</h5>
      <div>
        <Dummy {...props} />
      </div>
    </div>
  );
}

export default EditableTable;
