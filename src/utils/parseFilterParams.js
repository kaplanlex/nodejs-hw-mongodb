const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseIsFavorite = (isFavorite) => {
  if (isFavorite === 'true' || isFavorite === '1') return true;
  if (isFavorite === 'false' || isFavorite === '0') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavorite } = query;

  const parsedType = parseType(type);
  const parsedIsFavorite = parseIsFavorite(isFavorite);

  return {
    type: parsedType,
    isFavorite: parsedIsFavorite,
  };
};