import React from "react";
import  "./DiaryStyleSheet.css";
import { useNavigate } from "react-router-dom";

function EntryPageUI() {
    const navigate = useNavigate();
    const navigateToDiary = () => {navigate('/')}

    return (
        <div className="diary-container">
            
        {/*Header*/}
        <div className="diary-header">
            <button className="diary-title" onClick={navigateToDiary}>Diary Entries</button>
            <div className="customize-section">
                <button>Customize page</button>
                <span className="color-indicator"></span>
            </div>
        </div>

        {/*Diary page*/}
        <div className="diary-page">
            <div className="pages">
                <div className="left-page"></div>
                <div className="right-page"></div>
            </div>
        </div>
    </div>
   );
}

export default EntryPageUI;