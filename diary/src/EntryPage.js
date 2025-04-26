import React, {useEffect, useState} from "react";
import  "./DiaryStyleSheet.css";
import { useNavigate } from "react-router-dom";
import { getAllEntries, updateEntry } from "./DiaryStorage";

function EntryPageUI() {
    const [selectedEntry,setSelectedEntry] = useState(null);

    const navigate = useNavigate();
    const navigateToDiary = () => {navigate('/')}

    const [entries, setEntries] = useState([])
    useEffect(() => {
        const storedEntries = getAllEntries();
        if (storedEntries.length === 0) {
            const debugEntry = {
                id:Date.now(),
                title:"Test Entry",
                text:"Debug",
                mood:3,
                timestamp: new Date().toISOString(),
                image:""
            };
            const newEntries = [debugEntry]
            localStorage.setItem("diaryEntries",JSON.stringify(newEntries));
            setEntries(newEntries)
        } else {
            setEntries(storedEntries);
        }
    },[]);

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
                            {entries.map(entry => (
                                <li key={entry.id} onClick={() => setSelectedEntry(entry)} className="entry-item">
                                    <strong>{entry.title}</strong><br/>
                                    <small>{new Date(entry.timestamp).toLocaleDateString()}</small>
                                </li>
                            ))}
                        </ul>
                </div>
            </div>
        </div>
        {/*Popup modal*/}
        {selectedEntry && (
            <div className="modal-background" onClick={() => setSelectedEntry(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Edit Entry</h2>
                    <div>
                        <input 
                            type="text"
                            value={selectedEntry.title}
                            onChange={(e) => setSelectedEntry({...selectedEntry, title: e.target.value})}>
                        </input>
                    </div>
                    <div>
                        <textarea
                            value={selectedEntry.text}
                            onChange={(e) => setSelectedEntry({...selectedEntry, text: e.target.value})}>
                        </textarea>
                    </div>
                    <div>
                        <button onClick={() => {
                            updateEntry(selectedEntry.id,{title: selectedEntry.title,text: selectedEntry.text}); setSelectedEntry(null);
                            }} className="button">Save</button>
                        <button onClick={() => setSelectedEntry(null)} className="button">Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </div>
   );
}

export default EntryPageUI;