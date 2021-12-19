import React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import "./PerfectScrollbar.css"


export default class Scrollbar extends React.Component {
  ps: PerfectScrollbar | null = null;

  componentDidMount() {

  }

  componentWillUnmount() {
    this.ps?.destroy()
  }

  setObject = (element: HTMLElement) => {
    this.ps = new PerfectScrollbar(element);
  }

  render() {
    return (
      <div className="ps" ref={(dom) => { if (dom !== null) { this.setObject(dom) } }}>
        {this.props.children}
      </div>
    )
  }
}