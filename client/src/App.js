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

const App = () => {
  const path = window.location.pathname;
  let history = useHistory();

  useEffect(() => {
    store.dispatch(isAuthenticated(() => history.push(path)));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout appName="My App">
          <Alerts />
          <Switch>
            <Route exact path="/" component={Home} />
            <LoggedOutRoute exact path="/auth/login" component={Login} />
            <LoggedOutRoute exact path="/auth/register" component={Register} />
            <PrivateRoute exact path="/list/create" component={CreateList} />
            <PrivateRoute exact path="/list/:id" component={ShowList} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </div>
  );
};

export default App;
