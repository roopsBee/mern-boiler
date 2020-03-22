import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout appName="My App">
          <h1>App</h1>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
