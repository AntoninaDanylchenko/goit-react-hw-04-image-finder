import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainApp } from './App.styled';
import Loader from './Loader';
import axios from 'axios';

class App extends Component {
  state = {
    imgSearch: '',
    images: [],
    error: '',
    isLoading: false,
    page: 1,
  };

  searchFormSubmit = imgSearch => {
    this.setState({ imgSearch, images: [], page: 1, error: '' });
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.imgSearch !== this.state.imgSearch ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const r = await axios({
          url: 'https://pixabay.com/api/',
          params: {
            key: '30996005-ea40810ea94cfe1a7fe206b35',
            q: this.state.imgSearch,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 12,
            page: this.state.page,
          },
        });

        if (r.data.hits.length) {
          return this.setState(prev => ({
            images: [...prev.images, ...r.data.hits],
          }));
        } else {
          return toast.error(
            'Sorry, there are no images matching your search query.'
          );
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  loadMore = event => {
    event.preventDefault();
    this.setState(pr => ({
      page: pr.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSearch={this.searchFormSubmit} />
        <MainApp>
          {isLoading && <Loader />}
          {error && <h2>{error}</h2>}
          {images.length !== 0 && (
            <ImageGallery images={images} onLoadMore={this.loadMore} />
          )}
          <ToastContainer />
        </MainApp>
      </>
    );
  }
}
export default App;
