import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { useEffect } from "react";

import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import theme from "./components/themes/theme";
import store from "./store";
import Alerts from "./components/layout/Alerts";
import { isAuthenticated } from "./actions/auth";
import PrivateRoute from "./components/auth/PrivateRoute";
import Private from "./components/Private";
import "./App.css";

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
              <Route exact path="/" component={Home} />
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/register" component={Register} />
              <PrivateRoute exact path="/private" component={Private} />
            </Layout>
          </ThemeProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
