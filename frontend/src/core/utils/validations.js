// Elimina espacios al inicio y al final de strings en un objeto
export const trimObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
};

export const removeEmptyObjectsFromArray = (arr) =>
  arr.filter((obj) => Object.values(obj).some((value) => value.trim() !== ""));

export const objectArraysAreEqual = (a, b) => {
  if (a.length !== b.length) return false;

  return a.every((obj, i) => JSON.stringify(obj) === JSON.stringify(b[i]));
};

// Para ComplexExercise.jsx: números, letras inglesas, espacios y: . ^ ( ) + - * ÷ / : | =
const regexBasic = /^[0-9a-zA-Z .^()+\-*÷/:|=]*$/;

export const validarTextoBasico = (str) => {
  if (typeof str !== "string") return false;
  return regexBasic.test(str);
};

// Para AnswersInput.jsx: Igual que el anterior pero permite coma
const regexWithComma = /^[0-9a-zA-Z .^()+\-*÷/:|=,]*$/;

export const validarTextoConComa = (str) => {
  if (typeof str !== "string") return false;
  return regexWithComma.test(str);
};
