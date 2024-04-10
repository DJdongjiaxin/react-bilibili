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
  const unLogin = () => {
    localStorage.removeItem('eyeUser');
    window.location.reload();
  }
  return (
    <div className="space">
      <div className={style.topWrapper}>
        <Header />
      </div>
      <div className={style.banner}>
        <img src={banner} />
        <div>
          <span onClick={()=>{  window.location.href = '/editInfo';}}>编辑信息</span>
          <span onClick={unLogin}>退出登录</span>
          <span>平台反馈</span>
        </div>
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
