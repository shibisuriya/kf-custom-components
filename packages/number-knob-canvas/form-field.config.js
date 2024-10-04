import { FORM_FIELD_COMPONENTS, PLATFORMS } from "@kissflow/form-field-config";

const formFieldConfig = {
  [PLATFORMS.WEB]: {
    [FORM_FIELD_COMPONENTS.FORM_FIELD]: "./src/web/FormField.jsx",
    [FORM_FIELD_COMPONENTS.EDITABLE_TABLE]: "./src/web/EditableTable.jsx",
    [FORM_FIELD_COMPONENTS.READONLY_TABLE]: "./src/web/ReadonlyTable.jsx",
    [FORM_FIELD_COMPONENTS.CARD]: "./src/web/Card.jsx",
  },
  //[PLATFORMS.PWA]: {
  //  [FORM_FIELD_COMPONENTS.FORM_FIELD]: "./src/pwa/FormField.jsx",
  //  [FORM_FIELD_COMPONENTS.READONLY_TABLE]: "./src/pwa/ReadonlyTable.jsx",
  //},
};

export default formFieldConfig;
