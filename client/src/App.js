import React from "react";
import { Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect } from "react";
import { Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import theme from "./themes/theme";
import store from "./store";
import Alerts from "./components/layout/Alerts";
import { isAuthenticated } from "./actions/auth";
import LoggedOutRoute from "./components/auth/LoggedOutRoute";
import CreateList from "./components/views/CreateList";
import PrivateRoute from "./components/auth/PrivateRoute";
import ShowList from "./components/views/ShowList";
import RoutesTransition from "./components/routes/RoutesTransition";
import AuthSuccess from "./components/views/AuthSuccess";
import AuthFailure from "./components/views/AuthFailure";

const App = () => {
  const path = window.location.pathname;
  let history = useHistory();

  useEffect(() => {
    store.dispatch(isAuthenticated(() => history.push(path)));
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout appName="My App">
        <Alerts />
        <RoutesTransition>
          <Switch>
            <Route exact path="/" component={Home} />
            <LoggedOutRoute exact path="/auth/login" component={Login} />
            <LoggedOutRoute exact path="/auth/register" component={Register} />
            <PrivateRoute exact path="/list/create" component={CreateList} />
            <PrivateRoute exact path="/list/:id" component={ShowList} />
            <PrivateRoute exact path="/auth/success" component={AuthSuccess} />
            <Route exact path="auth/failure" component={AuthFailure} />
          </Switch>
        </RoutesTransition>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
