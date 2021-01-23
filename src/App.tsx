import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Encoding from './Encoding';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/encoding">
          <Header title="Encoding"></Header>
          <Encoding></Encoding>
        </Route>
        <Route exact path="/">
          <Header title="Index"></Header>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
