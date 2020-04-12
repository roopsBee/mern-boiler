import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import theme from "./components/themes/theme";
import store from "./store";
import Alerts from "./components/layout/Alerts";
import { isAuthenticated } from "./actions/auth";
import LoggedOutRoute from "./components/auth/LoggedOutRoute";
import CreateList from "./components/CreateList";
import PrivateRoute from "./components/auth/PrivateRoute";
import ShowList from "./components/ShowList";

const App = () => {
  useEffect(() => {
    store.dispatch(isAuthenticated());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <Layout appName="My App">
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <LoggedOutRoute exact path="/auth/login" component={Login} />
                <LoggedOutRoute
                  exact
                  path="/auth/register"
                  component={Register}
                />
                <PrivateRoute
                  exact
                  path="/list/create"
                  component={CreateList}
                />
                <PrivateRoute exact path="/list/:id" component={ShowList} />
              </Switch>
            </Layout>
          </ThemeProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
