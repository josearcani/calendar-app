import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title: 'Cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(2,'hours').toDate(),
      bgcolor: '#fafafa',
      notes:'Comprar pastel',
      user: {
        _id: '1234',
        name: 'Rocio',
      }
    }
  ],
  activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload,
        ],
      }
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }
  
    default:
      return state
  }
}
