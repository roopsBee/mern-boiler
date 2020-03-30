import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import theme from "./components/themes/theme";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <Layout appName="My App">
              <Route exact path="/" component={Home} />
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/register" component={Register} />
            </Layout>
          </ThemeProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
