import axios from 'axios';

const keyAPI = '37013770-4fd46202a1ea52ee31e31a9bd';

export const fetchImages = (query, currentPage) => {
  const axiosOptions = {
    params: {
      key: keyAPI,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: currentPage,
    },
  };

  return axios.get('https://pixabay.com/api/', axiosOptions);
};