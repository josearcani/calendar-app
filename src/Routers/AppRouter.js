import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../actions/authActions';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const { checking, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  


  if (checking) {
    return <h1>Espere</h1>
  }

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoute
            exact
            path="/login"
            component={ LoginScreen }
            isAuth={ !!uid }
          />
          <PrivateRoute
            exact
            path="/"
            component={ CalendarScreen }
            isAuth={ !!uid }
          />

          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  )
};
