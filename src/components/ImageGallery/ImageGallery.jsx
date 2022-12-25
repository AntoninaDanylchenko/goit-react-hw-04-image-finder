import React, { Component } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../Loader';
import LoadMore from 'components/LoadMore';
import { ImageGalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.imgSearch !== this.props.imgSearch ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      try {
        const r = await axios({
          url: 'https://pixabay.com/api/',
          params: {
            key: '30996005-ea40810ea94cfe1a7fe206b35',
            q: this.props.imgSearch,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 12,
            page: this.state.page,
          },
        });
        this.setState({ images: r.data.hits });

        if (r.data.hits.length) {
          return this.setState({ status: 'resolved' });
        } else {
          return this.setState({
            error:
              'Sorry, there are no images matching your search query. Please try again.',
            status: 'rejected',
          });
        }
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }
  loadMore = () => {
    this.setState(pr => ({
      page: pr.page + 1,
    }));
    console.log(this.state.page);
  };
  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <p>Please enter some words to searching.</p>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h2>{error}</h2>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            {images.map(({ id, webformatURL, tag }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tag={tag}
              />
            ))}
          </ImageGalleryList>
          <LoadMore onClick={this.loadMore} />
        </>
      );
    }
  }
}
export default ImageGallery;

/* <p>Sorry, there are no images matching your search query. Please try again.</p>; */
