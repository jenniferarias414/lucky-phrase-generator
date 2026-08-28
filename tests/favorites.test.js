// Favorites System Tests
// Tests the localStorage integration and favorites toggle logic

const {
  loadFavorites,
  saveFavorites,
  isFavorited,
  toggleFavorite,
  FAVORITES_KEY
} = require("../utils");

describe("Favorites System", () => {
  // Clear localStorage before each test to ensure isolation
  beforeEach(() => {
    localStorage.clear();
  });

  describe("loadFavorites()", () => {
    test("should return an empty array when no favorites are saved", () => {
      const result = loadFavorites();
      expect(result).toEqual([]);
    });

    test("should return previously saved favorites", () => {
      const testFavorites = ["Phrase 1", "Phrase 2", "Phrase 3"];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(testFavorites));
      
      const result = loadFavorites();
      expect(result).toEqual(testFavorites);
    });

    test("should handle corrupted localStorage gracefully", () => {
      localStorage.setItem(FAVORITES_KEY, "invalid json {broken");
      
      const result = loadFavorites();
      expect(result).toEqual([]);
    });
  });

  describe("saveFavorites()", () => {
    test("should save an array of phrases to localStorage", () => {
      const testFavorites = ["Phrase A", "Phrase B"];
      saveFavorites(testFavorites);
      
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
      expect(stored).toEqual(testFavorites);
    });

    test("should overwrite existing favorites", () => {
      const firstFavorites = ["Phrase 1"];
      const secondFavorites = ["Phrase 2", "Phrase 3"];
      
      saveFavorites(firstFavorites);
      saveFavorites(secondFavorites);
      
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
      expect(stored).toEqual(secondFavorites);
    });

    test("should handle empty array", () => {
      saveFavorites([]);
      
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
      expect(stored).toEqual([]);
    });
  });

  describe("isFavorited()", () => {
    test("should return false when phrase is not in favorites", () => {
      const result = isFavorited("Non-existent phrase");
      expect(result).toBe(false);
    });

    test("should return true when phrase is in favorites", () => {
      const phrase = "Good things are coming";
      saveFavorites([phrase]);
      
      const result = isFavorited(phrase);
      expect(result).toBe(true);
    });

    test("should handle case sensitivity correctly", () => {
      const phrase = "Good things are coming";
      saveFavorites([phrase]);
      
      expect(isFavorited(phrase)).toBe(true);
      expect(isFavorited(phrase.toUpperCase())).toBe(false);
    });
  });

  describe("toggleFavorite()", () => {
    test("should add a phrase to favorites if not present", () => {
      const phrase = "New favorite phrase";
      
      toggleFavorite(phrase);
      
      expect(isFavorited(phrase)).toBe(true);
    });

    test("should remove a phrase from favorites if already present", () => {
      const phrase = "Phrase to remove";
      
      toggleFavorite(phrase); // Add
      expect(isFavorited(phrase)).toBe(true);
      
      toggleFavorite(phrase); // Remove
      expect(isFavorited(phrase)).toBe(false);
    });

    test("should preserve other favorites when toggling", () => {
      const phrase1 = "First phrase";
      const phrase2 = "Second phrase";
      
      toggleFavorite(phrase1);
      toggleFavorite(phrase2);
      
      const favorites = loadFavorites();
      expect(favorites).toContain(phrase1);
      expect(favorites).toContain(phrase2);
      expect(favorites.length).toBe(2);
    });

    test("should handle repeated toggling correctly", () => {
      const phrase = "Toggle test phrase";
      
      toggleFavorite(phrase);
      toggleFavorite(phrase);
      toggleFavorite(phrase);
      
      expect(isFavorited(phrase)).toBe(true);
      
      toggleFavorite(phrase);
      expect(isFavorited(phrase)).toBe(false);
    });
  });
});
