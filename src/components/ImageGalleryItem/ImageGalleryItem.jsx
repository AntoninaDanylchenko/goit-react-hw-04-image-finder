import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tag }) => {
  return (
    <>
      <GalleryItem>
        <GalleryItemImg src={webformatURL} alt={tag} />
      </GalleryItem>
    </>
  );
};

export default ImageGalleryItem;
