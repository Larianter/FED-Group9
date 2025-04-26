const STORAGE_KEY = "diaryEntries";

export function getAllEntries() {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return entries;
}

function saveAllEntries(entries){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// id = int
// title = String
// text = String
// mood = int
// timestamp = auto-generated
// image = String(base64)

export function addEntry({title, text, mood, image}) {
    const newEntry = {
        id: Date.now(),
        title,
        text,
        mood: parseInt(mood),
        timestamp: new Date().toISOString(),
        image: image || "",
    };
    const entries = getAllEntries();
    entries.unshift(newEntry);
    saveAllEntries(entries);
    return newEntry;
}

export function updateEntry(id, updateFields) {
    const entries = getAllEntries();
    const updatedEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, ...updateFields} : entry
    );
    saveAllEntries(updatedEntries);
}

export function deleteEntry(id){
    const entries = getAllEntries();
    const filteredEntries = entries.filter((entry) => entry.id !== id);
    saveAllEntries(filteredEntries);
}