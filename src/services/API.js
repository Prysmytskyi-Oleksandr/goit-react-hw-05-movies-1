import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'e78259dddba5c209adb34bb75b422bf7',
  },
});

export const fetchMoviesTrending = async () => {
  const { data } = await instance.get('/trending/movie/day');
  return data.results;
};

export const fetchMoviesDetailsById = async id => {
  const { data } = await instance.get(`/movie/${id}`);
  return data;
};

export const fetchMoviesSerch = async searchName => {
  const { data } = await instance.get('/search/movie', {
    params: {
      query: searchName,
    },
  });
  return data.results;
};

export const fetchMoviesCastById = async id => {
  const { data } = await instance.get(`/movie/${id}/credits`);
  return data.cast;
};

export const fetchMoviesReviewsById = async id => {
  const { data } = await instance.get(`/movie/${id}/reviews`);
  return data.results;
};
