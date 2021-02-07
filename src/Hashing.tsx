import React from "react";
import PerfectScrollbar from 'perfect-scrollbar';
import ClipboardJS from "clipboard";
import CryptoJS from "crypto-js";
import { MD5, SHA1, SHA3, SHA224, SHA256, SHA384, SHA512, RIPEMD160 } from 'crypto-js';
import { sendNotification } from "./Notification";
import "./Hashing.css";

class HashResult extends React.Component<{ name: string, hashable: string, fn: (text: string) => string }> {
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
    const value = this.props.fn(this.props.hashable).toUpperCase();

    return (
      <div className="pure-u-1 code-font" style={{
        padding: "0.4em", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <label style={{ paddingRight: "0.5em" }}>
          {this.props.name.toUpperCase()}
        </label>
        <input id={this.props.name} data-clipboard-target={"#" + this.props.name}
          type="text" value={value} readOnly
          style={{
            border: "1px #eee solid", outline: "none", padding: ".2em .5em",
            width: "calc(100% - 7em)", backgroundColor: "transparent", color: "inherit"
          }}
        />
      </div>
    )
  }
}

class Hashing extends React.Component<{},
  { hashable: string | CryptoJS.lib.WordArray, file: File | null, loading: boolean }> {
  state = { hashable: "", file: new File([], ""), loading: false }

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

  onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.item(0);
    this.setState({ loading: true });
    file?.arrayBuffer().then(value => this.setState({
      // @ts-ignore
      hashable: CryptoJS.lib.WordArray.create(value),
      file: file ?? null,
      loading: false,
    }))
  }

  render() {
    const { hashable, file, loading } = this.state;

    const text = file.size > 0 ? `File name: ${file.name}
                                \rFile size: ${file.size} bytes
                                \rFile type: ${file.type}` : hashable;

    return (
      <main className="pure-g">
        <div className="pure-u-1" style={{
          background: "rgb(245, 244, 244)", height: 160,
          borderBottom: "rgb(232, 232, 232) 1px solid"
        }}></div>

        <div className="pure-u-22-24 pure-u-lg-20-24 pure-u-xl-18-24" style={{ margin: "0 auto", position: "relative", top: "-100px" }}>
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-2" style={{ backgroundColor: "#ffffff", border: "1px #eee solid", borderRight: "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1, position: "relative", borderBottom: "1px #eee solid", background: "#efefef" }}>
                  {
                    file.name
                      ? <div style={{ height: "100%", lineHeight: 2, textAlign: "center" }}>{file.name}</div>
                      : <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2548" width="32" height="32"><path d="M819.712 785.408H204.288c-18.944 0-34.304-15.36-34.304-34.304V477.696c0-18.944 15.36-34.304 34.304-34.304h68.608a34.304 34.304 0 0 1 0 68.608h-34.304v205.312h547.328V512h-34.304a34.304 34.304 0 0 1 0-68.608h68.608c18.944 0 34.304 15.36 34.304 34.304v273.408c-0.512 18.944-15.872 34.304-34.816 34.304z m-273.408-430.08V614.4a34.304 34.304 0 0 1-68.608 0V354.816L433.664 399.36c-14.336 12.288-35.84 10.752-48.128-3.584-10.752-12.8-10.752-31.744 0-44.544L485.888 250.88c5.632-6.144 12.8-10.24 20.992-11.776 10.752-1.536 21.504 2.048 29.184 9.728l102.4 102.4c13.312 13.312 13.312 34.816 0 48.128-6.656 6.656-15.36 10.24-24.576 10.24-9.216 0-17.92-3.584-24.064-9.728l-43.52-44.544z" p-id="2549" fill="#8a8a8a"></path></svg>
                  }
                  <input type="file" onChange={this.onUploadFile} key={file.name}
                    style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: "100%", opacity: 0 }} />
                </div>
                <button className="button" style={{ outline: "none", display: "flex", alignItems: "center" }}
                  onClick={() => this.setState({ hashable: "", file: new File([], "") })} disabled={loading}>
                  {
                    loading
                      ? <svg className="icon" style={{ animation: "spin 1s steps(100, end) infinite", padding: 4 }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M963.7376 271.1552c-13.056 23.5008-30.72 43.8784-52.4288 59.5456 25.1392 55.296 39.5264 116.5312 39.5264 181.2992 0 242.3808-196.4544 438.8352-438.8352 438.8352-242.432 0-438.8352-196.5056-438.8352-438.8352 0-242.3808 196.4544-438.8352 438.8352-438.8352 46.6432 0 91.4944 7.424 133.632 20.8896 13.0048-23.1936 30.5152-43.3152 51.8656-58.8288C639.9488 12.7488 577.536 0 512 0 229.2224 0 0 229.2224 0 512s229.2224 512 512 512 512-229.2224 512-512c0-87.0912-21.8624-169.0112-60.2624-240.8448zM822.8864 256c50.5344 0 91.392-40.96 91.392-91.4432s-40.9088-91.4432-91.392-91.4432c-50.5344 0-91.4432 40.9088-91.4432 91.4432 0 50.4832 40.9088 91.4432 91.4432 91.4432z" p-id="4655"></path></svg>
                      : <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M551.424 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L514.56 475.136 319.488 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L477.696 512 282.624 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L514.56 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L551.424 512z" fill="#1A1A1A" p-id="2978"></path></svg>
                  }
                </button>
              </div>
              <textarea
                style={{ border: "none", outline: "none", minHeight: "25.5em", width: "100%", padding: "1em", resize: "vertical", backgroundColor: "transparent" }}
                rows={10} value={text} className="code-font" onChange={(event) => { this.setState({ hashable: event.target.value }) }}
                readOnly={file.size > 0}>
              </textarea>
            </div>

            <div className="pure-u-1 pure-u-md-1-2" style={{ backgroundColor: "rgb(37, 37, 37)", color: "#bbb", padding: ".5em" }}>
              <HashResult name="md5" hashable={hashable} fn={(hashable: string) => MD5(hashable).toString()} />
              <HashResult name="sha1" hashable={hashable} fn={(hashable: string) => SHA1(hashable).toString()} />
              <HashResult name="sha3-224" hashable={hashable} fn={(hashable: string) => SHA3(hashable, { outputLength: 224 }).toString()} />
              <HashResult name="sha3-256" hashable={hashable} fn={(hashable: string) => SHA3(hashable, { outputLength: 256 }).toString()} />
              <HashResult name="sha3-384" hashable={hashable} fn={(hashable: string) => SHA3(hashable, { outputLength: 384 }).toString()} />
              <HashResult name="sha3-512" hashable={hashable} fn={(hashable: string) => SHA3(hashable, { outputLength: 512 }).toString()} />
              <HashResult name="sha224" hashable={hashable} fn={(hashable: string) => SHA224(hashable).toString()} />
              <HashResult name="sha256" hashable={hashable} fn={(hashable: string) => SHA256(hashable).toString()} />
              <HashResult name="sha384" hashable={hashable} fn={(hashable: string) => SHA384(hashable).toString()} />
              <HashResult name="sha512" hashable={hashable} fn={(hashable: string) => SHA512(hashable).toString()} />
              <HashResult name="ripem160" hashable={hashable} fn={(hashable: string) => RIPEMD160(hashable).toString()} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Hashing;
