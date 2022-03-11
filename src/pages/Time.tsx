import React from 'react';
import './Time.css';

export default class Time extends React.Component {
  state: {
    now: number,
  } = {
      now: new Date().getTime()
    }

  getISOString = () => {
    try {
      return new Date(this.state.now).toISOString()
    }
    catch (err) {
      return ""
    }
  }

  getLocalString = () => {
    let date = new Date(this.state.now);
    return formatDate(date, "yyyy-mm-ddTHH:MM");
  }

  getLocalTimezone = () => {
    let timezone = -new Date().getTimezoneOffset() / 60;
    return "UTC" + ((timezone > 0) ? `+${timezone}` : `-${timezone}`) + "h"
  }

  render() {
    const { now } = this.state;
    const now_second = (this.state.now - (this.state.now % 1000)) / 1000;
    const iso_string = this.getISOString();
    const local_string = this.getLocalString();
    const timezone = this.getLocalTimezone();
    return (
      <main className="time pure-form pure-form-aligned">
        <div className="pure-control-group">
          <label htmlFor="second-timestamp">秒级时间戳</label>
          <input id="second-timestamp" value={now_second} type="number"
            onChange={event => { this.setState({ now: event.target.valueAsNumber * 1000 }) }} />
        </div>

        <div className="pure-control-group">
          <label htmlFor="timestamp">毫秒级时间戳</label>
          <input id="timestamp" value={now} type="number"
            onChange={event => { this.setState({ now: event.target.valueAsNumber }) }} />
        </div>

        <div className="pure-control-group">
          <label htmlFor="iso-time">标准 ISO 时间</label>
          <input id="iso-time" value={iso_string} type="datetime"
            onChange={event => { this.setState({ now: new Date(event.target.value).getTime() }) }} />
        </div>

        <div className="pure-control-group">
          <label htmlFor="local-time">当地时间 {timezone}</label>
          <input id="local-time" value={local_string} type="datetime-local"
            onChange={event => { this.setState({ now: new Date(event.target.value).getTime() }) }} />
        </div>
      </main>
    )
  }
}

const formatDate = (date: Date, fmt: string) => {
  let o = {
    "m+": date.getMonth() + 1,                   //月份
    "d+": date.getDate(),                        //日
    "H+": date.getHours(),                       //小时
    "M+": date.getMinutes(),                     //分
    "S+": date.getSeconds(),                     //秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        // @ts-ignore
        (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))
      );
    }
  }
  return fmt;
}
