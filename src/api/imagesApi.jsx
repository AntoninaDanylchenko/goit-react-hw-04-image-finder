import axios from 'axios';

const imagesListFetch = async (imgSearchQuery, page, controller) => {
  return axios(
    {
      url: 'https://pixabay.com/api/',
      params: {
        key: '30996005-ea40810ea94cfe1a7fe206b35',
        q: imgSearchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    },
    { signal: controller.signal }
  ).then(res => res.data.hits);
};

export default imagesListFetch;
