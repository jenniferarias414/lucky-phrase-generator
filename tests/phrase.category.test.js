// Phrase Category Tests
// Tests category constants and local fallback phrase filtering

const {
  getFallbackPhrasesByCategory,
  fallbackPhrases,
  PHRASE_CATEGORIES,
  ALL_CATEGORIES
} = require("../utils");

describe("Phrase Categories", () => {
  test("should expose the expected category options", () => {
    expect(PHRASE_CATEGORIES).toEqual([
      "All",
      "Motivation",
      "Confidence",
      "Life",
      "Funny"
    ]);
  });

  test("should return all fallback phrases for All", () => {
    const result = getFallbackPhrasesByCategory(ALL_CATEGORIES);

    expect(result).toEqual(fallbackPhrases);
  });

  test("should return all fallback phrases for invalid categories", () => {
    const result = getFallbackPhrasesByCategory("Unknown");

    expect(result).toEqual(fallbackPhrases);
  });

  test("should return only matching phrases for a specific category", () => {
    const result = getFallbackPhrasesByCategory("Life");

    expect(result.length).toBeGreaterThan(0);
    result.forEach((phrase) => {
      expect(phrase.category).toBe("Life");
    });
  });

  test("should have at least one phrase for each selectable local category", () => {
    PHRASE_CATEGORIES
      .filter((category) => category !== ALL_CATEGORIES)
      .forEach((category) => {
        expect(getFallbackPhrasesByCategory(category).length).toBeGreaterThan(0);
      });
  });
});
