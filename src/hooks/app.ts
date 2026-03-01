export const createArrayPlaceholder = (num: number) => {
  return Array.from({ length: num }, (_, i) => i);
};
