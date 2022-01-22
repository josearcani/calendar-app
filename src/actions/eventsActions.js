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

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
