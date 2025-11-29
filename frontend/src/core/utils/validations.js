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
