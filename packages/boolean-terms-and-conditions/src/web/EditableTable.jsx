import React from "react";

import FormField from "./FormField.jsx";

function EditableTable(props) {
  const { focused } = props?.cell;
  if (!focused) {
    return <div>{String(props?.value)}</div>;
  }

  return (
    <div>
      <FormField {...props} />
    </div>
  );
}

export default EditableTable;
