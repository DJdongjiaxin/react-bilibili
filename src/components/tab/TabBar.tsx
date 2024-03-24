// components/tab/TabBar.js
import './index.css'
import * as React from "react";

export default function Tabbar({ onClick }) {
  const handleClick = (href) => {
    window.location.href = `/${href}`;
  }

  React.useEffect(() => {
    const currentUrl = window.location.href;
    const isMyCurrent = ['/space', '/history', '/login'].some(path => currentUrl.includes(path));

    // 根据 isMyCurrent 的值更新元素的类名
    const homeElement = document.querySelector('.tabbar_btn.home');
    const myElement = document.querySelector('.tabbar_btn.my');

    if (isMyCurrent) {
      homeElement.classList.remove('current');
      myElement.classList.add('current');
    } else {
      homeElement.classList.add('current');
      myElement.classList.remove('current');
    }
  }, []);
  const getHref = () => {
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
    <div className='tabbar'>
      <div className='tabbar_btn home current' onClick={() => { handleClick('index') }}></div>
      <div className='tabbar_btn camera' onClick={onClick}></div>
      <div className='tabbar_btn my' onClick={() => { getHref() }}></div>
    </div>
  );
}