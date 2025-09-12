export const capitalizeWord = (word: string) => {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalizeSentence = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => capitalizeWord(word))
    .join(" ");
}