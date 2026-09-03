// Randomization Tests
// Tests the random selection logic for phrases and API sources

const {
  getRandomFallbackPhrase,
  getFallbackPhrasesByCategory,
  getRandomApiSource,
  fallbackPhrases,
  apiSources,
  PHRASE_CATEGORIES,
  ALL_CATEGORIES
} = require("../utils");

describe("Randomization Functions", () => {
  describe("fallbackPhrases", () => {
    test("should store fallback phrases as categorized objects", () => {
      fallbackPhrases.forEach((phrase) => {
        expect(phrase).toHaveProperty("text");
        expect(phrase).toHaveProperty("category");
        expect(typeof phrase.text).toBe("string");
        expect(phrase.text.length).toBeGreaterThan(0);
        expect(PHRASE_CATEGORIES).toContain(phrase.category);
        expect(phrase.category).not.toBe(ALL_CATEGORIES);
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

  describe("getRandomFallbackPhrase()", () => {
    test("should return a phrase from the fallback array", () => {
      const result = getRandomFallbackPhrase();
      expect(fallbackPhrases.map((phrase) => phrase.text)).toContain(result);
    });

    test("should never return undefined", () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomFallbackPhrase();
        expect(result).toBeDefined();
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
      }
    });

    test("should return different phrases over multiple calls", () => {
      const results = new Set();
      
      // Call multiple times and collect unique results
      for (let i = 0; i < 50; i++) {
        results.add(getRandomFallbackPhrase());
      }
      
      // Should get multiple different phrases (not always the same one)
      expect(results.size).toBeGreaterThan(1);
    });

    test("should have access to all phrases in the array", () => {
      const results = new Set();
      
      // Run many times to attempt to get all phrases
      for (let i = 0; i < 1000; i++) {
        results.add(getRandomFallbackPhrase());
      }
      
      // Should be able to reach most phrases over many iterations
      // (This is a probabilistic test - not guaranteed to hit all 70+)
      expect(results.size).toBeGreaterThan(fallbackPhrases.length * 0.5);
    });

    test("should return a phrase from a requested category", () => {
      const categoryPhrases = getFallbackPhrasesByCategory("Confidence").map((phrase) => phrase.text);

      for (let i = 0; i < 50; i++) {
        const result = getRandomFallbackPhrase("Confidence");
        expect(categoryPhrases).toContain(result);
      }
    });

    test("should safely treat invalid categories like All", () => {
      const result = getRandomFallbackPhrase("Not a real category");

      expect(fallbackPhrases.map((phrase) => phrase.text)).toContain(result);
    });
  });

  describe("getFallbackPhrasesByCategory()", () => {
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
  });

  describe("getRandomApiSource()", () => {
    test("should return an API source object", () => {
      const result = getRandomApiSource();
      expect(result).toBeDefined();
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("url");
      expect(result).toHaveProperty("parse");
    });

    test("should return only configured API sources", () => {
      for (let i = 0; i < 50; i++) {
        const result = getRandomApiSource();
        expect(apiSources).toContainEqual(result);
      }
    });

    test("should have a valid URL for each source", () => {
      const result = getRandomApiSource();
      expect(result.url).toMatch(/^https?:\/\/.+/);
    });

    test("should have a parse function that is callable", () => {
      const result = getRandomApiSource();
      expect(typeof result.parse).toBe("function");
    });

    test("should return different sources over multiple calls", () => {
      const results = new Set();
      
      for (let i = 0; i < 100; i++) {
        const source = getRandomApiSource();
        results.add(source.name);
      }
      
      // Should get multiple different API sources
      expect(results.size).toBeGreaterThan(1);
    });
  });
});
