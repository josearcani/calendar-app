import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/uiActions';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  

  return (
    <button
      className="btn btn-primary fab"
      onClick={ () => dispatch(uiOpenModal()) }
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};

