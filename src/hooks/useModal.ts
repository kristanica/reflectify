import { useState } from "react";

export default function useModal() {
  const [modalVisibility, toggleModalVisibility] = useState<boolean>(false);

  const openModal = () => {
    toggleModalVisibility(true);
  };

  const closeModal = () => {
    toggleModalVisibility(false);
  };

  const toggleModal = () => {
    toggleModalVisibility((prev) => !prev);
  };

  return { modalVisibility, openModal, closeModal, toggleModal };
}
