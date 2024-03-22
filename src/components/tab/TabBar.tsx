import './index.css'
import * as React from "react";

export default function Tabbar({ onClick }) {

    const handleClick = (href) => {
        window.location.href = `/${href}`;
    }
    return (
        <div className='tabbar'>
            <div className='tabbar_btn home current' onClick={() => { handleClick('index') }}></div>
            <div className='tabbar_btn camera' onClick={onClick}></div>
            <div className='tabbar_btn my' onClick={() => { handleClick('index') }}></div>
        </div>
    )
}