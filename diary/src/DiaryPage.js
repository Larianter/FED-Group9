import React from "react";
import  "./DiaryStyleSheet.css";
import { useNavigate } from "react-router-dom";

 function DiaryPageUI() {
    const navigate = useNavigate();
    const navigateToEntry = () => {navigate('/entries')}

    return (
        <div className="diary-container">
            
        {/*Header*/}
        <div className="diary-header">
            <button className="diary-title" onClick={navigateToEntry}>Diary_name</button>
            <div className="customize-section">
                <button>Customize page</button>
                <span className="color-indicator"></span>
            </div>
        </div>

        {/*Diary page*/}
        <div className="diary-page">
            <div className ="diary-spine"></div>
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
