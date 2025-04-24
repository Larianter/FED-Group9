import React from "react";
import  "./DiaryStyleSheet.css";

 function DiaryPageUI() {
    return (
        <div className="diary-container">
            
        {/*Header*/}
        <div className="diary-header">
            <button className="diary-title">Diary_name</button>
            <div className="customize-section">
                <button>
                    Customize page
                    <span className="color-indicator"></span>
                </button>
            </div>
        </div>

        {/*Diary page*/}
        <div className="diary-page">
            <div className = "diary-spine"></div>
                <div className="pages">
                    <div className="left-page"></div>
                    <div className="right-page"></div>
                </div>
        </div>

        {/*Arrow button*/}
        <button className="arrow-button">→</button>

        {/*Sidebar*/}
        <div className="sidebar-button-container">
            <button className="sidebar-button">T</button>
            <button className="sidebar-button">🖼</button>
            <button className="sidebar-button">M</button>
            <button className="sidebar-button">...</button>
        </div>
    </div>
   );
}

export default DiaryPageUI;
