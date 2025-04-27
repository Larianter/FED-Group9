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

    const [leftText, setLeftText] = useState("");
    const [rightText, setRightText] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [mood, setMood] = useState("");
    const [image, setImage] = useState("");

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

    const handleSave = (event) => {
        event.preventDefault();
      
        const title = document.getElementById('title').value; 
        const text = leftText;  // Use state for leftText 
        const rightTextContent = rightText;  // Use state for rightText
        const mood = document.querySelector('input[name="mood"]:checked')?.value;

        const imageInput = document.getElementById('image');
        const imageFile = imageInput ? imageInput.files[0] : null;

        if (!title || !text || !mood) {
            console.log("Title, Text, or Mood is missing");
            return;
        }

        let image = "";

        if (imageFile) {
            // If an image file is selected, convert it to base64
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64String = reader.result;

                const newEntry = {
                    title,
                    text,
                    rightTextContent,
                    mood,
                    image: base64String // Save image as base64
                };

                addEntry(newEntry); 
            };
            reader.readAsDataURL(imageFile);
        } else {
            // If no image is uploaded, save empty image
            const newEntry = {
                title,
                text,
                rightTextContent,
                mood,
                image: "" // No image uploaded
            };
            addEntry(newEntry);
        }
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
            <div className="diary-spine"></div>
            <div className="pages">
                
                {/* Left Page */}
                <div className="left-page">
                <div className="entry-form">
                    <input
                    className="entry-field"
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                    className="entry-field-text"
                    id="leftText"
                    maxLength="500"
                    placeholder="Maximum 500 characters"
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    />
                </div>
                </div>

                {/* Right Page */}
                <div className="right-page">
                <div className="entry-form">
                    <textarea
                    className="entry-field-text right-page-text"
                    id="rightText"
                    maxLength="500"
                    placeholder="Maximum 500 characters"
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    />

                    <div className="mood-section">
                    <label className="entry-field">Today's Mood</label>
                    <div className="entry-mood-tracker">
                        <label className="entry-mood-label">Terrible</label>
                        <input
                        className="entry-mood-radio"
                        type="radio"
                        name="mood"
                        value="1"
                        checked={mood === "1"}
                        onChange={(e) => setMood(e.target.value)}
                        />
                        <input
                        className="entry-mood-radio"
                        type="radio"
                        name="mood"
                        value="2"
                        checked={mood === "2"}
                        onChange={(e) => setMood(e.target.value)}
                        />
                        <input
                        className="entry-mood-radio"
                        type="radio"
                        name="mood"
                        value="3"
                        checked={mood === "3"}
                        onChange={(e) => setMood(e.target.value)}
                        />
                        <input
                        className="entry-mood-radio"
                        type="radio"
                        name="mood"
                        value="4"
                        checked={mood === "4"}
                        onChange={(e) => setMood(e.target.value)}
                        />
                        <input
                        className="entry-mood-radio"
                        type="radio"
                        name="mood"
                        value="5"
                        checked={mood === "5"}
                        onChange={(e) => setMood(e.target.value)}
                        />
                        <label className="entry-mood-label">Great</label>
                    </div>

                    <input
                        className="entry-field"
                        type="text"
                        id="image"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    </div> {/* end of mood-section */}
                </div> {/* end of entry-form */}
                </div> {/* end of right-page */}

            </div> {/* end of pages */}
            </div> {/* end of diary-page */}

            {/*Sidebar*/}
            <div className="sidebar-button-container">
            <button className="sidebar-button" onClick={openTextPopup}>T</button>
            <button className="sidebar-button">🖼</button>
            <button className="sidebar-button">...</button>
            </div>

            <button className="save-entry-button" onClick={handleSave}>Save</button>

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

        </div> // end of diary-container
        );
    };
export default DiaryPageUI;