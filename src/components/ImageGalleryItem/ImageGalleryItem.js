import React from "react";
import "./ImageGalleryItem.css";

function ImageGalleryItem({ handleImgClick, largeImageURL, webformatURL }) {
  const onImageClick = (src) => {
    handleImgClick(src);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        data-source={largeImageURL}
        onClick={() => onImageClick(largeImageURL)}
      />
    </li>
  );
}

export default ImageGalleryItem;
