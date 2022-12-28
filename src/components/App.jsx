import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainApp } from './App.styled';
import Loader from './Loader';
import axios from 'axios';

const App = () => {
  const [imgSearchQuery, setImgSearchQuery] = useState('second');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const searchFormSubmit = imgSearch => {
    setImgSearchQuery(imgSearch);
    reset();
  };
  const reset = () => {
    setImages([]);
    setError('');
    setPage(1);
  };

  useEffect(() => {
    setIsLoading(true);

    async function fetchToSearch() {
      try {
        const r = await axios({
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
        });
        if (r.data.hits.length) {
          console.log(imgSearchQuery);
          return setImages(prev => [...prev, ...r.data.hits]);
        } else {
          return toast.error(
            'Sorry, there are no images matching your search query.'
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchToSearch();
    // return () => {
    //   second
    // }
  }, [imgSearchQuery, page]);

  const loadMore = event => {
    event.preventDefault();
    setPage(pr => pr + 1);
  };

  return (
    <>
      <Searchbar onSearchProp={searchFormSubmit} />
      <MainApp>
        {isLoading && <Loader />}
        {error && <h2>{error}</h2>}
        {images.length !== 0 && (
          <ImageGallery images={images} onLoadMore={loadMore} />
        )}
        <ToastContainer />
      </MainApp>
    </>
  );
};
export default App;
