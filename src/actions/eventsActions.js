import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepare-events';
import { types } from '../types/types';

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = { _id: uid, name };
        dispatch(eventAddNew(event));
      } 
    } catch (error) {
      console.log(error);
    }
  }
}

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events');
      const body = await resp.json(); // {ok: bool, events: arr, total: num}
      const events = prepareEvents(body.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  }
}

export const startEventUpdated = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${ event.id }`, event, 'PUT');
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const startEventDeleted = () => {
  return async (dispatch, getState) => {
    const id = getState().calendar.activeEvent.id;
    try {
      const resp = await fetchWithToken(`events/${ id }`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDeleted());
        Swal.fire('Success', body.msg, 'success');
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventClearLogout = () => ({
  type: types.eventClearLogout,
});
