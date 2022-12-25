import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainApp } from './App.styled';

class App extends Component {
  state = {
    imgSearch: '',
  };

  searchFormSubmit = imgSearch => {
    this.setState({ imgSearch });
  };

  render() {
    return (
      <>
        <Searchbar onSearch={this.searchFormSubmit} />
        <MainApp>
          <ImageGallery imgSearch={this.state.imgSearch} />
          <ToastContainer />
        </MainApp>
      </>
    );
  }
}
export default App;
