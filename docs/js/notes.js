// ============================================================
// VibeParts - Notes System
// ============================================================

const NOTES_KEY = 'vibeparts_notes';

// Get all notes from localStorage
export function getAllNotes() {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

// Get note for a specific component
export function getNote(id) {
  const notes = getAllNotes();
  return notes[id] || '';
}

// Check if a component has a note
export function hasNote(id) {
  const note = getNote(id);
  return note && note.trim().length > 0;
}

// Save note for a component
export function saveNote(id, content) {
  let notes = getAllNotes();
  const trimmed = content.trim();
  
  if (trimmed === '') {
    delete notes[id];
  } else {
    notes[id] = trimmed;
  }
  
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

// Count total components with notes
export function countNotes() {
  return Object.keys(getAllNotes()).length;
}
