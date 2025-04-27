const THEME_STORAGE_KEY = "selectedTheme";

export function getTheme(){
    return localStorage.getItem(THEME_STORAGE_KEY) || "default"; // What is the default color?
}

export function setTheme(themeName){
    if (typeof themeName === "string" && themeName.length > 0) {
        localStorage.setItem(THEME_STORAGE_KEY, themeName);
    }
}