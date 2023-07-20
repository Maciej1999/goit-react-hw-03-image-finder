import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = `37527059-e422356509d98ede2a3340a26`;
const PER_PAGE = 12;

export const fetchData = async (
  q = '',
  page = 1,
  handleError = console.log
) => {
  const options = {
    // method: 'get',
    baseURL: BASE_URL,
    params: {
      q: q,
      page: page,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
    },
  };

  return await axios
    .create(options)
    .get()
    .catch(err => {
      handleError(err);
    });
};
