import { types } from '../types/types';

export const openModal = () => ({
  type: types.openModal,
});

export const closeModal = () => ({
  type: types.uiCloseModal,
});
