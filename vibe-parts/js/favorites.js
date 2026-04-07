// ============================================================
// VibeParts - Favorites System
// ============================================================

const FAVORITES_KEY = 'vibeparts_favorites';

// Get all favorites from localStorage
export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// Check if a component is favorited
export function isFavorite(id) {
  const favs = getFavorites();
  return favs.includes(id);
}

// Toggle favorite status for a component
export function toggleFavorite(id) {
  let favs = getFavorites();
  const index = favs.indexOf(id);
  
  if (index === -1) {
    favs.push(id);
  } else {
    favs.splice(index, 1);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return index === -1; // true if added, false if removed
}
