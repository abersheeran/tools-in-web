import React from 'react';
import ContentEditable from 'react-contenteditable'
import { setLocationHashValue, getLocationHashValue } from '../utils/LocationHash';
import './TextShare.css';

export default class TextShare extends React.Component {
  state: {
    source: string,
  } = {
      source: this.getSourceTextFromLocationHash(),
    }

  contentEditable: React.RefObject<HTMLElement> = React.createRef();

  getSourceTextFromLocationHash(): string {
    let text = getLocationHashValue("source");
    if (text === null) {
      return ""
    }
    let raw_string = fromBase64(text);
    return raw_string;
  }

  setSourceTextToLocationHash(text: string) {
    this.setState({ source: text });
    return setLocationHashValue("source", toBase64(text));
  }

  handleChange = (event: any) => {
    this.setSourceTextToLocationHash(event.target.value);
  };

  render() {
    const { source } = this.state;
    return (
      <main className="text-share">
        <ContentEditable
          id="textarea" className="code-font"
          innerRef={this.contentEditable}
          html={source}                // innerHTML of the editable div
          disabled={false}             // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
        />
      </main>
    )
  }
}

const fromBase64 = (value: string) => {
  try {
    return decodeURIComponent(escape(window.atob(value.trim())));
  } catch (e) {
    console.error("invalid base64: " + value);
    return "";
  }
}
const toBase64 = (value: string) => window.btoa(unescape(encodeURIComponent(value)))
