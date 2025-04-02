import { FIELD_TYPES } from "../constants.js";

function stringToNumber(input) {
  const number = Number(input);

  if (isNaN(number)) {
    throw new Error(`Unable to convert "${input}" to a number.`);
  }

  return number;
}

function stringToBoolean(str) {
  if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  }

  throw new Error(`Can't typecast ${str} to boolean...`);
}

function stringToObject(str) {
  try {
    const obj = JSON.parse(str);
    if (typeof obj !== "object" || obj === null) {
      throw new Error(`${obj} is not an object.`);
    }

    return obj;
  } catch (err) {
    throw err;
  }
}

function stringToObjectList(str) {
  try {
    const objectList = JSON.parse(str);
    const isEveryItemObject = objectList.every(
      (item) => typeof item === "object" && item !== null,
    );
    if (isEveryItemObject) {
      return objectList;
    } else {
      throw new Error(`Not every item in the list an object.`);
    }
  } catch (err) {
    throw err;
  }
}

function stringToStringList(str) {
  try {
    const stringList = JSON.parse(str);

    const isEveryItemString = stringList.every(
      (item) => typeof item === "string",
    );

    if (!isEveryItemString) {
      throw new Error("Not all items are strings");
    }
    return stringList;
  } catch (err) {
    throw err;
  }
}

function typecastValue({ fieldType, value }) {
  switch (fieldType) {
    case FIELD_TYPES.TEXT:
      return value;

    case FIELD_TYPES.NUMBER:
      return stringToNumber(value);

    case FIELD_TYPES.BOOLEAN:
      return stringToBoolean(value);

    case FIELD_TYPES.STRING_LIST:
      return stringToStringList(value);

    case FIELD_TYPES.OBJECT:
      return stringToObject(value);

    case FIELD_TYPES.OBJECT_LIST:
      return stringToObjectList(value);

    default:
      throw new Error(`Invalid fieldType ${fieldType}.`);
  }
}

export { typecastValue };
