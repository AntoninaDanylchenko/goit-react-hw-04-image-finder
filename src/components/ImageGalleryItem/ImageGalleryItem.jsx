import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tag, onClick }) => {
  return (
    <>
      <GalleryItem>
        <GalleryItemImg src={webformatURL} alt={tag} onClick={onClick} />
      </GalleryItem>
    </>
  );
};

export default ImageGalleryItem;
