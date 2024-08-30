import React from "react";
import { ApiInspector } from "api-inspector";

export const FormField = (props) => {
  return (
    <div>
      <ApiInspector {...props} />
    </div>
  );
};

export default FormField;
