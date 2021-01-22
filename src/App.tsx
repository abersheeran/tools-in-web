import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header';
import Encoding from './Encoding';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/encoding">
            <Header title="Encoding"></Header>
            <Encoding></Encoding>
          </Route>
          <Route path="/">
            <Header title="Index"></Header>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
