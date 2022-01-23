import moment from 'moment';

export const prepareEvents = (events = []) => {

  // console.log(events);

  return  events.map(
    event => ({
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    })
  )

}