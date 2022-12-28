import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSearchProp }) => {
  const [searchImgQuery, setSearchImgQuery] = useState('');

  const searchSubmit = e => {
    e.preventDefault();
    if (searchImgQuery.trim() === '') {
      toast.error('Please enter some world');
      return;
    }
    onSearchProp(searchImgQuery);
    setSearchImgQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={searchSubmit}>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setSearchImgQuery(e.currentTarget.value.toLowerCase())}
          value={searchImgQuery}
        />

        <SearchFormButton type="submit">
          <ImSearch />
        </SearchFormButton>
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;
