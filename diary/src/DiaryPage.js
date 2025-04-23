import React from "react";
import  "./DiaryStyleSheet.css";

 function DiaryPageUI() {
    return (
        <div className="diary-container">
        {/*Header*/}
        <div className="diary-header">
            <h1 className="diary-title">Diary_name</h1>
            <div className="customize-section">
                <button>Customize page</button>
                <span className="color-indicator"></span>
            </div>
        </div>

        {/*Diary page*/}
        <div className="diary-page">
            <div className="pages"></div>
                <div className="left-page"></div>
                <div className="right-page"></div>
            </div>
            

        {/*Sidebar buttons*/}
        <div className="sidebar-button-container">
            <button className="sidebar-button">T</button>
            <button className="sidebar-button"></button>
            <button className="sidebar-button">M</button>
            <button className="sidebar-button">...</button>
        </div>

        {/*Arrow button*/}
        <button className="arrow-button">→</button>
    </div>
   );
}

export default DiaryPageUI;
