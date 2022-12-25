import { LoadMoreBtn } from './LoadMore.styled';

const LoadMore = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      Load More
    </LoadMoreBtn>
  );
};

export default LoadMore;
