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
        <div className ="diary-spine"></div>
            <div className="pages">
                <div className="left-page">
                    <div className="page-header">Mood Summaries</div>
                    <div className="sub-header">This Month</div>
                        <ul>
                            <li>test</li> {/*Fetch mood data from memory*/}
                        </ul>
                </div>
                <div className="right-page">
                    <div className="page-header">Entries</div>
                    <div className="sub-header">This Month</div>
                        <ul>
                            <li>test</li> {/*Fetch previous entries from memory*/}
                        </ul>
                </div>
            </div>
        </div>
    </div>
   );
}

export default EntryPageUI;