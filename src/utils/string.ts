export const getFirstSubstring = (input: string, delimiter: string) => {
  const substrings = input.split(delimiter);
  return substrings[0].trim();
};
