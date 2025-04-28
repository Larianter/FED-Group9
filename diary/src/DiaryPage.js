import React, { useState } from "react";
import  "./DiaryStyleSheet.css";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup"
import { addEntry } from "./DiaryStorage";
import { useEffect } from "react";

const formSubmission = (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    // Collect form data
    const title = document.getElementById('title').value;
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const mood = document.querySelector('input[name="mood"]:checked')?.value; // Get selected mood

    // Call the addEntry function with the collected data
    const newEntry = addEntry({
        title,
        text1,
        text2,
        mood,
    });

    // Optionally, clear the form fields after submission
    event.target.reset();
};

 function DiaryPageUI() {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            document.body.className = '';
            document.body.classList.add(`theme-${savedTheme}`);
        }
    }, []);

    const navigateToEntry = () => {navigate('/entries')};

    const openTextPopup = () => {
    setPopupType('text');
    setIsPopupOpen(true);
    };

    const openThemePopup = () => {
    setPopupType('theme');
    setIsPopupOpen(true);
    };

    const closePopup = () => {
    setIsPopupOpen(false);
    setPopupType(null);
    };

    const switchTheme = (themeName) => {
        document.body.className = ''; // Clear previous classes
        document.body.classList.add(`theme-${themeName}`);
        localStorage.setItem('selectedTheme', themeName);
        closePopup();
    };

    return (
        <div className="diary-container">
            
        {/*Header*/}
        <div className="diary-header">
            <button className="diary-title" onClick={navigateToEntry}>My Diary</button>
            <div className="customize-section">
                <button onClick={openThemePopup}>Customize page</button> {/*Opens color popup*/}
                <span className="color-indicator"></span>
            </div>
        </div>

        {/*Diary page*/}
        <div className="diary-page">
            <div className ="diary-spine"></div>
                <div className="pages">
                    <div className="left-page">
                        <form onSubmit={formSubmission} className="entry-form" >
                            <input className="entry-field" type="text" id="title" placeholder="Title" />
                            <div className="entry-subcontainer">
                                <textarea className="entry-field-text" type="text1" id="text1" maxLength="1100" placeholder="Start writing..." />
                                <textarea className="entry-field-text" type="text2" id="text2" maxLength="1100" placeholder="Start writing..." />
                            </div>
                            <label className="mood-tracker-header">Today's Mood</label>
                            <div className="entry-mood-tracker">
                                <label className="entry-mood-label" htmlFor="mood1">Terrible</label>
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood1" value="1" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood2" value="2" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood3" value="3" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood4" value="4" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood5" value="5" />
                                <label className="entry-mood-label" htmlFor="mood1">Great</label>
                            </div>
                            <button className="submit-button" type="submit">Save</button>
                        </form>
                    </div>
                    <div className="right-page"></div>
                </div>
            </div>


        {/*Sidebar*/}
        <div className="sidebar-button-container">
            <button className="sidebar-button" onClick = {openTextPopup}>T</button>
            <button className="sidebar-button">🖼</button>
            <button className="sidebar-button">...</button>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup}>
            {popupType === 'text' && (
                <>
                <div className="sidebar-text-popup">
                    <div className="sidebar-text-popup-stroke">
                        <div className="text-popup-section">
                            <label>Typography:</label>
                            <select className="typography-select">
                                <option value="default">Default</option>
                                <option value="serif">Serif</option>
                                <option value="sans-serif">Sans Serif</option>
                                <option value="monospace">Monospace</option>
                                {/* Dynamically map font options here */}
                            </select>
                        </div>

                        <div className="text-popup-buttons">
                            <button className="text-style-button">B</button>
                            <button className="text-style-button">I</button>
                            <button className="text-style-button">U</button>
                        </div>

                        <div className="text-popup-section">
                            <label>Text colour:</label>
                            <input type="color" className="color-input" />
                        </div>

                        <div className="text-popup-section">
                            <label>Text highlight:</label>
                            <input type="color" className="color-input" />
                        </div>
                        <button className="close-popup-button" onClick={closePopup}>Close</button>
                    </div>
                </div>
                </>
            )}
            {popupType === 'theme' && (
                <>
                <div className="theme-option-container">
                    <div className="theme-option-stroke">
                        <h2>Choose a Theme</h2>
                        <div className="theme-option" onClick={() => switchTheme('brown')}>
                        <span className="theme-sphere brown"></span> Brown Theme
                        </div>
                        <div className="theme-option" onClick={() => switchTheme('neapolitan')}>
                        <span className="theme-sphere neapolitan"></span> Neapolitan Theme
                        </div>
                    </div>
                    </div>
                </>
            )}
        </Popup>
    </div>
   );
}
export default DiaryPageUI;