import { format, subHours } from 'date-fns';

export const getImageUrl = (posterPath, size) => {
  return `https://image.tmdb.org/t/p/w${size}${posterPath}`;
};

export const getDate = () => {
  const dateOffset = subHours(new Date(), 3);
  return format(dateOffset, 'dd/MM/yyyy HH:mm');
};
