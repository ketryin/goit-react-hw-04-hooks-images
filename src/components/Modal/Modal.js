import React, { useEffect, useRef, useCallback } from "react";

import "./Modal.css";
import { createPortal } from "react-dom";

function Modal({ toggleModal, children }) {
  const modalRoot = useRef(document.querySelector("#modal-root"));

  const handleEscape = useCallback(
    (event) => {
      if (event.code === "Escape") {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot.current
  );
}

export default Modal;
