import React from 'react';

export const CalendarEvent = ({ event }) => {
  // event obtiene los valures de cada evento de la lista de eventos
  // console.log(event)
  const { title, user } = event;
  return (
    <div>
      <strong>{ title } </strong>
      <span> - { user.name }</span>
    </div>
  );
};
