import * as React from "react";
import Header from "../../components/header/Header";
import { NestedRoute } from "../../router";

import banner from "../../assets/images/banner-top.png";
import style from "./space.styl?css-modules";

const Space = (props) => {
  React.useEffect(() => {
    const eyeUser = localStorage.getItem('eyeUser');
    if (!eyeUser) {
      // 如果本地存储中有 eyeUser，跳转到 /space 页面
      window.location.href = '/login';
    }
  }, [])
  return (
    <div className="space">
      <div className={style.topWrapper}>
        <Header />
      </div>
      <div className={style.banner}>
        <img src={banner} />
      </div>
      {
        props.router.map((route, i) =>
          <NestedRoute {...route} key={i} />
        )
      }
    </div>
  );
}

export default Space;
