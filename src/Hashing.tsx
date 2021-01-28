import React from "react";
import PerfectScrollbar from 'perfect-scrollbar';
import ClipboardJS from "clipboard";
import { MD5, SHA1, SHA3, SHA224, SHA256, SHA384, SHA512, RIPEMD160 } from 'crypto-js';

import { sendNotification } from "./Notification";

class HashResult extends React.Component<{ name: string, text: string, fn: (text: string) => string }> {
  clipboard: ClipboardJS | null = null;

  componentDidMount() {
    this.clipboard = new ClipboardJS("#" + this.props.name);
    this.clipboard.on("success", event => {
      sendNotification("success", `复制 ${this.props.name.toUpperCase()} 成功`)
    })
  }

  componentWillUnmount() {
    this.clipboard?.destroy();
  }

  render() {
    const value = this.props.fn(this.props.text).toUpperCase();

    return (
      <div className="pure-u-1" style={{
        padding: "0.4em", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <label style={{ paddingRight: "0.5em" }}>
          {this.props.name.toUpperCase()}
        </label>
        <input id={this.props.name} data-clipboard-target={"#" + this.props.name}
          type="text" value={value} readOnly
          style={{
            border: "1px #ccc solid", outline: "none", padding: ".2em .5em",
            width: "calc(100% - 7em)", backgroundColor: "transparent"
          }}
        />
      </div>
    )
  }
}

class Hashing extends React.Component {
  state = {
    text: ""
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

  render() {
    const { text } = this.state;
    return (
      <main className="pure-g">
        <div className="pure-u-1" style={{
          background: "rgb(245, 244, 244)", height: 160,
          borderBottom: "rgb(232, 232, 232) 1px solid"
        }}></div>

        <div className="pure-u-22-24 pure-u-lg-20-24 pure-u-xl-18-24" style={{ margin: "0 auto", position: "relative", top: "-100px" }}>
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-2" style={{ backgroundColor: "#ffffff", border: "1px #eee solid", padding: "1em" }}>
              <textarea style={{ border: "none", outline: "none", minHeight: "25.5em", width: "100%", resize: "vertical", backgroundColor: "transparent" }}
                rows={10} value={text} className="code-font" onChange={(event) => { this.setState({ text: event.target.value }) }}>
              </textarea>
            </div>
            <div className="pure-u-1 pure-u-md-1-2" style={{ backgroundColor: "#EEEEEE", padding: ".5em" }}>
              <HashResult name="md5" text={text} fn={(text: string) => MD5(text).toString()} />
              <HashResult name="sha1" text={text} fn={(text: string) => SHA1(text).toString()} />
              <HashResult name="sha3-224" text={text} fn={(text: string) => SHA3(text, { outputLength: 224 }).toString()} />
              <HashResult name="sha3-256" text={text} fn={(text: string) => SHA3(text, { outputLength: 256 }).toString()} />
              <HashResult name="sha3-384" text={text} fn={(text: string) => SHA3(text, { outputLength: 384 }).toString()} />
              <HashResult name="sha3-512" text={text} fn={(text: string) => SHA3(text, { outputLength: 512 }).toString()} />
              <HashResult name="sha224" text={text} fn={(text: string) => SHA224(text).toString()} />
              <HashResult name="sha256" text={text} fn={(text: string) => SHA256(text).toString()} />
              <HashResult name="sha384" text={text} fn={(text: string) => SHA384(text).toString()} />
              <HashResult name="sha512" text={text} fn={(text: string) => SHA512(text).toString()} />
              <HashResult name="ripem-160" text={text} fn={(text: string) => RIPEMD160(text).toString()} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Hashing;
