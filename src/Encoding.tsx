import React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import { toUnicode as punycode2text, toASCII as text2punycode } from 'punycode';
import { setLocationHashValue, getLocationHashValue } from './LocationHash';
import './PerfectScrollbar.css';
import './Encoding.css';

type ConvertType = "text" | "url" | "base64" | "unicode" | "ascii" | "punycode";

var convert_types = ["text", "url", "base64", "unicode", "ascii", "punycode"];

function isConvertType(value: string): value is ConvertType {
  return convert_types.indexOf(value) !== -1;
}

function autoHeight(element: HTMLTextAreaElement) {
  element.style.height = 'auto';
  element.scrollTop = 0; //防抖动
  element.style.height = element.scrollHeight + 2 + 'px';
}

class Encoding extends React.Component {
  state: {
    source_type: ConvertType,
    target_type: ConvertType,
    source_text: string,
  } = {
      source_type: this.getSourceTypeFromLocationHash(),
      target_type: this.getTargetTypeFromLocationHash(),
      source_text: this.getSourceTextFromLocationHash(),
    }

  getSourceTypeFromLocationHash(): ConvertType {
    let source_type = getLocationHashValue("source-type") ?? "text";
    return isConvertType(source_type) ? source_type : "text"
  }

  getTargetTypeFromLocationHash(): ConvertType {
    let target_type = getLocationHashValue("target-type") ?? "text";
    return isConvertType(target_type) ? target_type : "text"
  }

  getSourceTextFromLocationHash(): string {
    return getLocationHashValue("source-text") ?? "";
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
      setLocationHashValue("source-type", type);
      this.setState({ source_type: type })
    }
  }

  changeTargetType = (type: string) => {
    return () => {
      setLocationHashValue("target-type", type);
      this.setState({ target_type: type })
    }
  }

  setSourceText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocationHashValue("source-text", event.target.value);
    autoHeight(event.target);
    this.setState({ source_text: event.target.value })
  }

  swap = () => {
    let { source_type, target_type, source_text } = this.state;
    let func = getTranslateFunction(source_type, target_type);
    setLocationHashValue("source-type", target_type);
    setLocationHashValue("target-type", source_type);
    setLocationHashValue("source-text", func(source_text));
    this.setState({ source_type: target_type, target_type: source_type, source_text: func(source_text) });
  }

  render() {
    let { source_type, target_type, source_text } = this.state;
    let func = getTranslateFunction(source_type, target_type);

    return (
      <main className="pure-g">
        <div className="pure-u-1" style={{
          background: "rgb(245, 244, 244)", height: 160,
          borderBottom: "rgb(232, 232, 232) 1px solid"
        }}></div>

        <div className="pure-u-22-24" id="translator">
          <div className="header pure-g pure-menu pure-menu-horizontal pure-menu-scrollable" style={{ padding: 0 }}>
            <div className="pure-u-11-24 pure-menu-list ps">
              {
                convert_types.map(type => (
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
                convert_types.map(type => (
                  <div key={type} onClick={this.changeTargetType(type)}
                    className={`pure-u encoding-button ${type === target_type ? 'active' : ''}`}>
                    {type.toUpperCase()}
                  </div>
                ))
              }
            </div>
          </div>
          <div className="pure-g">
            <textarea id="source" className="pure-u-1 pure-u-md-1-2 code-font" value={source_text}
              onChange={this.setSourceText} ref={(dom) => { dom?.focus(); }}></textarea>
            <textarea id="target" className="pure-u-1 pure-u-md-1-2 code-font" readOnly value={func(source_text)}></textarea>
          </div>
        </div>
      </main >
    );
  }
}

function getTranslateFunction(source_type: ConvertType, target_type: ConvertType): (value: string) => string {
  let functions: Record<string, (value: string) => string> = {
    "text2text": (value: string) => value,
    "base642text": (value: string) => {
      try {
        return decodeURIComponent(escape(window.atob(value.trim())));
      } catch (e) {
        console.error("invalid base64: " + value);
        return "";
      }
    },
    "text2base64": (value: string) => window.btoa(unescape(encodeURIComponent(value))),
    "url2text": decodeURI,
    "text2url": encodeURI,
    "unicode2text": (value: string) => unescape(value.replace(/\\u/g, '%u')),
    "text2unicode": (value: string) => escape(value).replace(/%u/g, '\\u'),
    "ascii2text": (value: string) => {
      try {
        return value.split("%").filter(item => item).map(item => String.fromCodePoint(parseInt(item, 16))).join("")
      } catch (e) {
        console.error("invalid ascii number: " + value);
        return ""
      }
    },
    "text2ascii": (value: string) => {
      return value.split("").map(item => "%" + item.codePointAt(0)?.toString(16).toUpperCase()).join("")
    },
    "punycode2text": punycode2text,
    "text2punycode": text2punycode,
  };
  return (value: string) => functions["text2" + target_type](functions[source_type + "2text"](value))
}

export default Encoding;
