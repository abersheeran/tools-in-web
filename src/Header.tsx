import React from 'react';
import PropTypes from 'prop-types'
import { Link, NavLink } from "react-router-dom";
import './Header.css';

function Header({ title }: { title: String }) {
  let toggle = () => {
    let icon = document.querySelector(".menu .menu-icon .icon");
    if (icon) {
      icon.classList.toggle("right");
    }
    let menubar = document.querySelector(".menu .menubar");
    if (menubar) {
      menubar.classList.toggle("menu-hidden");
    }
    let background = document.querySelector(".menu .menu-background");
    if (background) {
      background.toggleAttribute("hidden");
    }
  }

  return (
    <header className="pure-u-1"
      style={{ position: "sticky", top: 0, zIndex: 9999, display: "flex", justifyContent: "space-between" }}>
      <span className="menu center">
        <div className="center menu-icon" onClick={toggle}>
          <svg className="icon right" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2026">
            <path d="M 915.17 234.67 c 24.73 0 44.79 -17.92 44.79 -40 s -20.06 -40 -44.79 -40 H 108.81 c -24.74 0
                            -44.81 17.91 -44.81 40 s 20.07 40 44.81 40 Z M 915.17 552 c 24.73 0 44.79 -17.93 44.79 -40 s -20.02
                            -40 -44.79 -40 H 460.81 c -24.74 0 -44.81 17.91 -44.81 40 s 20.07 40 44.81 40 Z M 70.33 498.18 a
                            18.73 18.73 0 0 0 -1.74 26.32 c 0.46 0.58 1.16 1.16 1.74 1.75 L 262.64 694 a 9.39 9.39 0 0 0 15.5
                            -7.11 V 337.08 a 9.34 9.34 0 0 0 -15.5 -7 Z M 108.81 789.33 c -24.74 0 -44.81 17.92 -44.81 40 s
                            20.07 40 44.81 40 H 915.17 c 24.73 0 44.79 -17.91 44.79 -40 s -20.06 -40 -44.79 -40 Z"
              fill="#999999" p-id="2027">
            </path>
          </svg>
        </div>
        <div className="menu-background" hidden onClick={toggle}></div>
        <div className="menubar menu-hidden">
          <div className="content">
            <div className="menubar-header logo" style={{ lineHeight: "2.2" }}>
              <Link to="/">Tools</Link>
            </div>
            <div className="pure-menu">
              <ul className="pure-menu-list">
                <li className="pure-menu-item">
                  <NavLink to="/encoding" className="pure-menu-link" activeClassName="menu-selected">
                    <span className="menu-item-name">Encoding</span>
                    <span className="menu-item-description">在几种编码之间互相转换</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer" style={{ padding: "3em", fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
            Copyright&copy; by AberS
          </div>
        </div>
      </span>

      <span className="logo">{title}</span>

      <span className="avatar center" title="敬请期待">
        <div className="center" style={{ height: "1.6em" }}>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2914">
            <path
              d="M665.6 656.564706C771.011765 602.352941 843.294118 487.905882 843.294118 361.411765 843.294118
                    177.694118 695.717647 27.105882 512 27.105882S180.705882 174.682353 180.705882 358.4c0 126.494118
                    72.282353 243.952941 177.694118 298.164706C183.717647 707.764706 60.235294 852.329412 60.235294
                    1002.917647h60.235294c0-180.705882 174.682353-301.176471 391.529412-301.176471s391.529412 120.470588
                    391.529412 301.176471h60.235294c0-150.588235-123.482353-295.152941-298.164706-346.352941zM240.941176
                    358.4c0-150.588235 120.470588-271.058824 271.058824-271.058824s271.058824 120.470588 271.058824
                    271.058824-120.470588 271.058824-271.058824 271.058824-271.058824-123.482353-271.058824-271.058824z"
              fill="#2c2c2c" p-id="2915">
            </path>
          </svg>
        </div>
      </span>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header;
