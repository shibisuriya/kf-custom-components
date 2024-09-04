import { generateFakeText } from "./text.js";

function generateFakeStringList({ length = 2, stringLength = 5 } = {}) {
  const stringList = [];

  for (let i = 0; i < length; i++) {
    stringList.push(generateFakeText({ length: stringLength }));
  }

  return stringList;
}

export { generateFakeStringList };
