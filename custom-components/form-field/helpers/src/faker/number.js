function generateFakeNumber({ numberOfDigits = 5 } = {}) {
  if (numberOfDigits <= 0) return "0";

  const min = Math.pow(10, numberOfDigits - 1);
  const max = Math.pow(10, numberOfDigits) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generateFakeNumber };
