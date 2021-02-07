import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Encoding from './Encoding';
import Hashing from './Hashing';


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
      </Route>
    </Switch>
  </div>
)

export default App;
