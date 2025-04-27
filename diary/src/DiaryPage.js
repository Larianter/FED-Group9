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
    const text = document.getElementById('text').value;
    const mood = document.querySelector('input[name="mood"]:checked')?.value; // Get selected mood
    const image = document.getElementById('image').value; // Optional: Collect the image URL or path

    // Call the addEntry function with the collected data
    const newEntry = addEntry({
        title,
        text,
        mood,
        image
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
            <button className="diary-title" onClick={navigateToEntry}>Diary_name</button>
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
                            <textarea className="entry-field-text" type="text" id="text" maxLength="500" placeholder="Maximum 500 characters" />
                            <label className="entry-field">Today's Mood</label>
                            <div className="entry-mood-tracker">
                                <label className="entry-mood-label" htmlFor="mood1">Terrible</label>
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood1" value="1" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood2" value="2" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood3" value="3" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood4" value="4" />
                                <input className="entry-mood-radio" type="radio" name="mood" id="mood5" value="5" />
                                <label className="entry-mood-label" htmlFor="mood1">Great</label>
                            </div>
                            <input className="entry-field" type="image" id="image" />
                            <button className="arrow-button" type="submit">→</button>
                        </form>
                    </div>
                    <div className="right-page"></div>
                </div>
            </div>


        {/*Sidebar*/}
        <div className="sidebar-button-container">
            <button className="sidebar-button" onClick = {openTextPopup}>T</button>
            <button className="sidebar-button">🖼</button>
            <button className="sidebar-button">M</button>
            <button className="sidebar-button">...</button>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup}>
            {popupType === 'text' && (
                <>
                <h2>Text Tool</h2>
                <p>Test</p>
                <button onClick={closePopup}>Close</button>
                </>
            )}
            {popupType === 'theme' && (
                <>
                <div className="theme-option-container">
                    <h2>Choose a Theme</h2>
                    <div className="theme-option" onClick={() => switchTheme('brown')}>
                        <span className="theme-sphere brown"></span> Brown Theme
                    </div>
                    <div className="theme-option" onClick={() => switchTheme('neapolitan')}>
                        <span className="theme-sphere neapolitan"></span> Neapolitan Theme
                    </div>
                </div>
                </>
            )}
        </Popup>
    </div>
   );
}
export default DiaryPageUI;