import React from 'react';
import { useDispatch } from 'react-redux';
import { startEventDeleted } from '../../actions/eventsActions';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={ () => dispatch(startEventDeleted()) }
    >
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  );
};
