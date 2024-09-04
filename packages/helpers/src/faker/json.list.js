import { generateFakeJson } from "./json.js";

function generateFakeJsonList({ jsonSchema, length = 5 }) {
  return generateFakeJson({ jsonSchema });
}

export { generateFakeJsonList };
