import React, {useEffect, useState} from "react";
import  "./DiaryStyleSheet.css";
import { useNavigate } from "react-router-dom";
import { deleteEntry, getAllEntries, updateEntry } from "./DiaryStorage";

//Maps mood entries and returns summary
function getMoodSummaries(entries) {
    const summaries = {};
    const now = new Date();

    for (let i = 0; i < 6; i++) {
        const date = new Date(now.getFullYear(), now.getMonth()-i,1)
        const yearMonthKey =`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        summaries[yearMonthKey] = {
            moodSum: 0,
            count: 0,
        };
    }

    entries.forEach(entry => {
        const entryDate = new Date(entry.timestamp);
        const yearMonthKey = `${entryDate.getFullYear()}-${String(entryDate.getMonth() + 1).padStart(2, '0')}`;
        if (summaries[yearMonthKey]) {
            summaries[yearMonthKey].moodSum += entry.mood;
            summaries[yearMonthKey].count += 1;
        }
    });

    return summaries;
}

//Draw Entry page UI
function EntryPageUI() {
    const [selectedEntry,setSelectedEntry] = useState(null);

    const navigate = useNavigate();
    const navigateToDiary = () => {navigate('/')}

    const [entries, setEntries] = useState([]);
    const [moodSummaries, setMoodSummaries] = useState({});

    useEffect(() => {
        const storedEntries = getAllEntries();
        setEntries(storedEntries);
        setMoodSummaries(getMoodSummaries(storedEntries));
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
                    <div className="sub-header">Recent Months</div>
                        <ul>
                            {Object.entries(moodSummaries).map(([month,data]) => {
                                const averageMood = data.count > 0 ? (data.moodSum / data.count).toFixed(2) : "N/A";
                                const date = new Date(month + "-01");
                                const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric'});
                                return (
                                    <li key={month} className="entry-item">
                                        <strong>{monthName}</strong><br/>
                                        Total Entries: {data.count}<br/>
                                        Avg Mood: {averageMood}
                                    </li>
                                )
                            })}
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
                    <p1>{selectedEntry.timestamp.split('T')[0]}</p1>
                    <div>
                        <input 
                            type="text"
                            value={selectedEntry.title}
                            onChange={(e) => setSelectedEntry({...selectedEntry, title: e.target.value})}
                            className="entry-field">
                        </input>
                    </div>
                    <div className="entry-subcontainer">
                        <textarea
                            value={selectedEntry.text1}
                            onChange={(e) => setSelectedEntry({...selectedEntry, text1: e.target.value})}
                            className="entry-field-text">
                        </textarea>
                        <textarea
                            value={selectedEntry.text2}
                            onChange={(e) => setSelectedEntry({...selectedEntry, text2: e.target.value})}
                            className="entry-field-text">
                        </textarea>
                    </div>
                    <div>
                        <button onClick={() => {
                            updateEntry(selectedEntry.id,{title: selectedEntry.title,text1: selectedEntry.text1,text2: selectedEntry.text2});
                            setEntries(getAllEntries());
                            setSelectedEntry(null);
                            }} className="button">Save</button>
                        <button onClick={() => setSelectedEntry(null)} className="button">Cancel</button>
                        <button onClick={() => {
                            deleteEntry(selectedEntry.id);
                            setEntries(getAllEntries());
                            setSelectedEntry(null);
                            }} className="button">Delete</button>
                    </div>
                </div>
            </div>
        )}
    </div>
   );
}

export default EntryPageUI;