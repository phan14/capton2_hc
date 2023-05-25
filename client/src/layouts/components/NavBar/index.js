import { memo, useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

import styles from "./NavBar.module.css";
import Search from "../Search";
import { CreateLinkAccountContext } from "../../../contexts/CreateLinkAccountContext";

const MENU = [
  { path: "home", title: "Home" },
  { path: "link", title: "Link" },
  // { path: "card", title: "Card" },
  { path: "", title: "Product" },
  { path: "khuyen-mai", title: "Promotion" },
];

function NavBar() {
  const [isShow, setIsShow] = useState("hidden");

  return (
    <div className={`navbar  ${styles.navbar}`}>
      <div className={` flex   ${styles.navItem}`}>
        <Search isShow={isShow} />
        {MENU.map((item) => (
          <NavLink
            key={item.title}
            to={`/${item.path}`}
            className={` flex items-center  justify-center ${({ isActive }) =>
              isActive ? `${styles.active}` : null}`}
            onClick={() => {
              if (item.title === "Product" || item.title === "Promotion") {
                setIsShow("block");
              } else {
                setIsShow("hidden ");
              }
            }}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export function NavBarMobile() {
  const [show, setShow] = useState(false);

  return (
    <div className={`navbar xs:pr-4 ${styles.navbarMobile}`}>
      <div className={styles.iconBar} onClick={() => setShow(!show)}>
        {show ? <FaTimes /> : <FaBars />}
      </div>
      <div
        className={`${styles.menu} ${show && styles.active}`}
        onClick={() => setShow(false)}
      >
        <div className={styles.navItem}>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? `${styles.active}` : null)}
          >
            Home
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink
            to="/link"
            className={({ isActive }) => (isActive ? `${styles.active}` : null)}
          >
            Link
          </NavLink>
        </div>

        <div className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? `${styles.active}` : null)}
          >
            Products
          </NavLink>
        </div>
        {/* <div className={styles.navItem}>
                    <NavLink to="/san-pham" className={({ isActive }) => isActive ? `${styles.active}` : null}>Sản phẩm</NavLink>
                </div> */}
        <div className={styles.navItem}>
          <NavLink
            to="/khuyen-mai"
            className={({ isActive }) => (isActive ? `${styles.active}` : null)}
          >
            Promotion
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default memo(NavBar);
