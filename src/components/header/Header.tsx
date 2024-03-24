import * as React from "react";
import Logo from "../../components/Logo";
import Avatar from "../../components/Avatar";

import style from "./header.styl?css-modules";


const Header = () => {
  const handleClick = () => {
    const eyeUser = localStorage.getItem('eyeUser');
    if (eyeUser) {
      // 如果本地存储中有 eyeUser，跳转到 /space 页面
      window.location.href = '/space';
    } else {
      // 如果本地存储中没有 eyeUser，跳转到 /login 页面
      window.location.href = '/login';
    }
  };
  return (
    <div className={style.header}>
      <a className={style.logo} href="/index">
        <Logo />
      </a>
      <a className={style.avatar} onClick={handleClick}>
        <Avatar />
      </a>
      <a className={style.searchIcon} href="/search">
        <i className="icon-search" />
      </a>
    </div>
  );
}

export default Header;
