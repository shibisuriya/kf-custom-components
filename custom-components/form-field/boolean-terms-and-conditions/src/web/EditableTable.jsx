import React from "react";

import FormField from "./FormField.jsx";

function EditableTable(props) {
  const { focused } = props?.cell;
  if (!focused) {
    return <div>{props?.value? 'Accepted': "Not Accepted"}</div>;
  }

  return (
    <div>
      <FormField {...props} />
    </div>
  );
}

export default EditableTable;
