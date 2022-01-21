import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import { uiOpenModal } from '../../actions/uiActions';
import { eventClearActiveEvent, eventSetActive } from '../../actions/eventsActions';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

// const myEventsList = [
//   {
//     title: 'Cita con manicurista',
//     start: moment().toDate(),
//     end: moment().add(2,'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes:'hellow there',
//     user: {
//       _id: '1234',
//       name: 'Rocio',
//     }
//   }
// ]

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  const onDoubleClick = (e) => {
    // console.log(e);
    dispatch(uiOpenModal()); // double click to modify event
  }

  const onSelectEvent = (e) => {
    // console.log(e);
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    // console.log(e);
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    console.log(e); // you can craete a note directly on the date
    dispatch(eventClearActiveEvent());
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <Navbar />
  
      <Calendar
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        view={ lastView }
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      {
        activeEvent && <DeleteEventFab />
      }
      <CalendarModal />
    </div>
  );
};
