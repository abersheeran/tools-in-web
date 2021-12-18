import React from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import Header from './Header';
import Encoding from './Encoding';
import Hashing from './Hashing';
import './App.css';


export const apps = [
  {
    link: "/encoding",
    title: "Encoding",
    description: "在几种编码之间互相转换",
    component: <Encoding />,
  },
  {
    link: "/hashing",
    title: "Hashing",
    description: "计算文本/文件的哈希值",
    component: <Hashing />
  },
]

export const App = () => (
  <div style={{ textAlign: "center" }}>
    <Switch>
      {apps.map(app => (
        <Route key={app.link} path={app.link}>
          <Header title={app.title} />{app.component}
        </Route>
      ))}
      <Route exact path="/">
        <Header title="Index" />
        <main className="apps">
          {apps.map(app => (
            <NavLink to={app.link} className="app" key={app.link}>
              <h2 style={{ fontWeight: "normal", fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{app.title}</h2>
              <p>{app.description}</p>
            </NavLink>
          ))}
        </main>
      </Route>
    </Switch>
  </div>
)

export default App;
