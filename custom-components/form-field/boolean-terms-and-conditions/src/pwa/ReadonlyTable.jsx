import React from "react";
import FormFieldWeb from "../web/FormField.jsx";

function ReadonlyTable(props) {
  return (
    <div>
      <FormFieldWeb {...props} />
    </div>
  );
}

export default ReadonlyTable;
