import React from "react";

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          &times;
        </button>
        <img
          src={imageSrc}
          alt="Lightbox"
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Lightbox;
