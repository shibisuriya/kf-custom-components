import { generateFakeJson } from "./json.js";

function generateFakeJsonList({ jsonSchema }) {
  return generateFakeJson({ jsonSchema });
}

export { generateFakeJsonList };
