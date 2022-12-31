import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainApp } from './App.styled';
import Loader from './Loader';
import imagesListFetch from 'api/imagesApi';

const App = () => {
  const [imgSearchQuery, setImgSearchQuery] = useState('');
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
    if (imgSearchQuery === '') {
      return;
    }
    const controller = new AbortController();

    async function fetchToSearch() {
      try {
        setIsLoading(true);
        const r = await imagesListFetch(imgSearchQuery, page, controller);
        if (r.length > 0) {
          return setImages(prev => [...prev, ...r]);
        } else {
          return toast.error(
            'Sorry, there are no images matching your search query.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchToSearch();

    return () => {
      controller.abort();
    };
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
