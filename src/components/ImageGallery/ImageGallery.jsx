import { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMore from 'components/LoadMore';
import { ImageGalleryList } from './ImageGallery.styled';
import Modal from '../Modal';
import Loader from '../Loader';

const ImageGallery = ({ images, onLoadMore }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [tag, setTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
    setIsLoading(prevState => !prevState);
  };
  const openModalImg = id => {
    toggleModal();
    const image = images.find(img => img.id === id);
    setModalImg(image.largeImageURL);
    setTag(image.tag);
  };
  return (
    <>
      {isLoading && <Loader />}
      <ImageGalleryList>
        {images.map(({ id, webformatURL, tag }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tag={tag}
            onClick={() => openModalImg(id)}
          />
        ))}
      </ImageGalleryList>
      {images.length > 11 && <LoadMore onClick={onLoadMore} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg} alt={tag} />
        </Modal>
      )}
    </>
  );
};

export default ImageGallery;
