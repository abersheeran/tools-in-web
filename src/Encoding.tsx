import React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'punycode';

import './ps.css';
import './Encoding.css';

class Encoding extends React.Component {
  state = {
    source_type: "text",
    target_type: "text",
    source_text: "",
  }

  ps_list: Array<PerfectScrollbar> = []

  componentDidMount() {
    var elements = document.getElementsByClassName("ps");
    for (var i = 0; i < elements.length; i++) {
      this.ps_list.push(new PerfectScrollbar(elements[i]));
    }
  }

  componentWillUnmount() {
    this.ps_list.map(ps => ps.destroy())
  }

  changeSourceType = (type: string) => {
    return () => {
      this.setState({ source_type: type })
    }
  }

  changeTargetType = (type: string) => {
    return () => {
      this.setState({ target_type: type })
    }
  }

  swap = () => {
    let { source_type, target_type, source_text } = this.state;
    let func = getTranslateFunction(source_type, target_type);
    this.setState({ source_type: target_type, target_type: source_type, source_text: func(source_text) });
  }

  render() {
    let encoding_types = ["text", "url", "base64", "unicode", "ascii", "punycode"];
    let { source_type, target_type, source_text } = this.state;
    let func = getTranslateFunction(source_type, target_type);

    return (
      <main className="pure-g">
        <div className="pure-u-1" id="mbk"></div>

        <div className="pure-u-22-24" id="translator">
          <div className="header pure-g pure-menu pure-menu-horizontal pure-menu-scrollable" style={{ padding: 0 }}>
            <div className="pure-u-11-24 pure-menu-list ps">
              {
                encoding_types.map(type => (
                  <div key={type} onClick={this.changeSourceType(type)}
                    className={`pure-u encoding-button ${type === source_type ? 'active' : ''}`}>
                    {type.toUpperCase()}
                  </div>
                ))
              }
            </div>
            <div className="pure-u-2-24" onClick={this.swap} style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
              <button style={{ padding: 0, margin: 0, background: "transparent", boxShadow: "none", border: "none", outline: "none" }}>
                <svg viewBox="0 0 1024 1024" version="1.1" p-id="2026"
                  style={{ cursor: "pointer", width: "1.5em", height: "auto" }} width="200" height="200">
                  <path
                    d="M912 369.1c0 4.1-1.3 7.6-4 10.3L765.2 522.3c-2.7 2.7-6.1 4-10.3 4-3.8 0-7.2-1.4-10.1-4.2-2.8-2.8-4.2-6.2-4.2-10.1v-85.8H126.3c-3.8 0-7.2-1.4-10.1-4.2-2.8-2.8-4.2-6.2-4.2-10.1v-85.8c0-3.8 1.4-7.2 4.2-10.1 2.8-2.8 6.2-4.2 10.1-4.2h614.3V226c0-4.1 1.3-7.6 4-10.3 2.7-2.6 6.1-4 10.3-4 3.5 0 7.1 1.5 10.7 4.5L908 358.6c2.7 2.9 4 6.3 4 10.5z m0 242.9v85.8c0 3.8-1.4 7.2-4.2 10.1-2.8 2.8-6.2 4.2-10.1 4.2H283.4v85.8c0 3.8-1.4 7.2-4.2 10.1-2.8 2.8-6.2 4.2-10.1 4.2-3.5 0-7.1-1.5-10.7-4.5L116.1 664.9c-2.7-2.7-4-5.9-4-9.9 0-4.1 1.3-7.6 4-10.3L259 501.8c2.7-2.7 6.1-4 10.3-4 3.8 0 7.2 1.4 10.1 4.2s4.2 6.2 4.2 10.1v85.8h614.3c3.8 0 7.2 1.4 10.1 4.2 2.6 2.7 4 6 4 9.9z"
                    p-id="2027">
                  </path>
                </svg>
              </button>
            </div>
            <div className="pure-u-11-24 pure-menu-list ps">
              {
                encoding_types.map(type => (
                  <div key={type} onClick={this.changeTargetType(type)}
                    className={`pure-u encoding-button ${type === target_type ? 'active' : ''}`}>
                    {type.toUpperCase()}
                  </div>
                ))
              }
            </div>
          </div>
          <div className="pure-g">
            <textarea id="source" className="pure-u-1-2 code-font" value={source_text}
              onChange={event => this.setState({ source_text: event.target.value })}></textarea>
            <textarea id="target" className="pure-u-1-2 code-font" readOnly value={func(source_text)}></textarea>
          </div>
        </div>
      </main>
    );
  }
}

function getTranslateFunction(source_type: string, target_type: string) {
  if (source_type === "text" || target_type === "text") {
    return eval(source_type + "2" + target_type)
  }
  else {
    let _func0 = eval("text2" + target_type),
      _func1 = eval(source_type + "2text");
    return (value: string) => { _func0(_func1(value)) }
  }
}

function utoa(str: string) {
  /*
   使用utf-8字符集进行base64编码
   */
  return window.btoa(unescape(encodeURIComponent(str)));
}

function atou(str: string) {
  /*
   使用utf-8字符集解析base64字符串
   */
  return decodeURIComponent(escape(window.atob(str)));
}

function text2text(value: string) {
  return value;
}

function base642text(value: string) {
  try {
    return atou(value);
  } catch (e) {
    console.error("invalid base64: " + value);
    return "";
  }
}

function text2base64(value: string) {
  return utoa(value);
}

function url2text(value: string) {
  return decodeURI(value);
}

function text2url(value: string) {
  return encodeURI(value);
}

function unicode2text(value: string) {
  return unescape(value.replace(/\\u/g, '%u'));
}

function text2unicode(value: string) {
  return escape(value).replace(/%u/g, '\\u');
}

function ascii2text(value: string) {
  return value.split("%").filter(function (item) {
    return item;
  }).map(function (item) {
    return String.fromCodePoint(parseInt(item, 16));
  }).join("")
}

function text2ascii(value: string) {
  return value.split("").map(function (item: string) {
    return "%" + item.codePointAt(0)?.toString(16).toUpperCase();
  }).join("")
}

var punycode = require('punycode');

function punycode2text(value: string) {
  return punycode.toUnicode(value)
}

function text2punycode(value: string) {
  return punycode.toASCII(value)
}

export default Encoding;
