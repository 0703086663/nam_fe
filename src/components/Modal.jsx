import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000010] bg-opacity-50">
      <div className="modal bg-white p-6 rounded-lg shadow-lg relative w-[400px]">
        <button
          className="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="modal-content mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
