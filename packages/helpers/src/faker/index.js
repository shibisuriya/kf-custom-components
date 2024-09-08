import { FIELD_TYPES } from "../constants.js";

import { generateFakeNumber } from "./number.js";
import { generateFakeBoolean } from "./boolean.js";
import { generateFakeJson } from "./json.js";
import { generateFakeJsonList } from "./json.list.js";
import { generateFakeText } from "./text.js";
import { generateFakeStringList } from "./string.list.js";

function generateFakeValue({ fieldType, jsonSchema, length }) {
  switch (fieldType) {
    case FIELD_TYPES.TEXT:
      return generateFakeText();

    case FIELD_TYPES.NUMBER:
      return generateFakeNumber();

    case FIELD_TYPES.BOOLEAN:
      return generateFakeBoolean();

    case FIELD_TYPES.OBJECT:
      return generateFakeJson({ jsonSchema });

    case FIELD_TYPES.OBJECT_LIST:
      return generateFakeJsonList({ jsonSchema, length });

    case FIELD_TYPES.STRING_LIST:
      return generateFakeStringList({ length });

    default:
      throw new Error(
        `Can't generate fake values for the field type, ${fieldType}.`,
      );
  }
}

export { generateFakeValue };
