import { format } from 'date-fns';

export const getImageUrl = (posterPath, size) => {
  return `https://image.tmdb.org/t/p/w${size}${posterPath}`;
};

export const getDate = () => format(new Date(), 'dd/MM/yyyy HH:mm');
