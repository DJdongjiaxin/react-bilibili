import './index.css'
import * as React from "react";

export default function Tabbar({ onClick }) {

    return (
        <div className='tabbar'>
            <div className='tabbar_btn home current'></div>
            <div className='tabbar_btn camera' onClick={onClick}></div>
            <div className='tabbar_btn my'></div>
        </div>
    )
}