const wrap = (text, selection, wrapper, reverse) => {
  if (selection.from === selection.to) return text;
  if (reverse)
    return (
      text.slice(0, selection.from) +
      text
        .slice(selection.from, selection.to)
        .split("")
        .map((character) => {
          return `<${wrapper}>${character}</${wrapper}>`;
        })
        .join("") +
      text.slice(selection.to)
    );
  return (
    text.slice(0, selection.from) +
    text
      .slice(selection.from, selection.to)
      .split("")
      .map((character) => {
        return `<${wrapper}>${character}</${wrapper}>`;
      })
      .join("") +
    text.slice(selection.to)
  );
};

export const bold = (text, selection, reverse) => {
  return wrap(text, selection, "strong", reverse);
};
export const itallic = (text, selection) => {
  return wrap(text, selection, "em");
};
export const strikethrough = (text, selection) => {
  return wrap(text, selection, "s");
};
