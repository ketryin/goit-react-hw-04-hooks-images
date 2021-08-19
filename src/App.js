import React, { useEffect, useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import api from "./services/image-service";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Button from "./components/Button";
import Modal from "./components/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
};

function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState("");

  useEffect(() => {
    if (currentQuery === "" && currentPage === 1) {
      return;
    }
    handleQuery();
  }, [currentQuery, currentPage]);

  const onFormSubmit = (query) => {
    setCurrentQuery(query);
    setCurrentPage(1);
    setImages([]);
  };

  const handleQuery = () => {
    setStatus(Status.PENDING);
    setTimeout(() => {
      api
        .fetchImages(currentQuery, currentPage)
        .then((response) => {
          const newImages = response.hits.map(
            ({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })
          );

          setImages([...images].concat(newImages));
        })
        .finally(() => {
          setStatus(Status.RESOLVED);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        });
    }, 2000);
  };

  const handleMoreClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleImgClick = (src) => {
    setBigImg(src);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Searchbar onFormSubmit={onFormSubmit} />
      {status === "pending" && images.length === 0 ? (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={80}
          width={80}
          className="conteiner"
        />
      ) : (
        <>
          <ImageGallery images={images} handleImgClick={handleImgClick} />
        </>
      )}

      {status === "pending" && images.length > 0 && (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={80}
          width={80}
          className="conteiner"
        />
      )}
      {status === "resolved" && <Button onBtn={handleMoreClick} />}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={bigImg} alt="" />
        </Modal>
      )}
    </>
  );
}

export default App;
