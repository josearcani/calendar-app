import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/uiActions';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/eventsActions';
import moment from 'moment';
import Swal from 'sweetalert2';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const now = moment().minutes(0).seconds(0).add(1, 'hours');
// normallize time if 16:49:01 ==> 17:00:00
const notNow = now.clone().add(1,'hours');
// all moments are mutable, clone a moment

Modal.setAppElement('#root');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: notNow.toDate()
}

export const CalendarModal = () => {

  const { modalOpen } = useSelector((state) => state.ui );
  const { activeEvent } = useSelector((state) => state.calendar );
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(notNow.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      // in case it is null
      setFormValues(activeEvent);
      setDateStart(activeEvent.start);
      setDateEnd(activeEvent.end);
    } else {
      // to keep date acording
      setDateStart(now.toDate());
      setDateEnd(notNow.toDate());
    }
  }, [ activeEvent, setFormValues ]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues, 
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  }

  const handleStartDateChange = (e) => {
    console.log(e);
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    })
  }
  const handleEndDateChange = (e) => {
    console.log(e);
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'La fecha fub debe ser mayor que la fecha de inicio', 'error');
    }

    if (title.trim().length === 0) {
      return setTitleValid(false);
    }

    // TODO save to db 
    setTitleValid(true);
    // console.log(formValues);

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: 1233,
          name: 'joseph'
        }
      }));
    }

    closeModal();
  }

  return (
    <Modal
      isOpen={ modalOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={ closeModal }
      closeTimeoutMS={ 200 } // should match with css animation
      style={ customStyles }
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form
        className="container"
        onSubmit={ handleSubmit }
      >

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={ handleStartDateChange }
            value={ dateStart }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={ handleEndDateChange }
            value={ dateEnd }
            className="form-control"
            minDate={ dateStart }
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ !titleValid && 'is-invalid' }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  );
};
