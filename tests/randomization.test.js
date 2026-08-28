// Randomization Tests
// Tests the random selection logic for phrases and API sources

const {
  getRandomFallbackPhrase,
  getRandomApiSource,
  fallbackPhrases,
  apiSources
} = require("../utils");

describe("Randomization Functions", () => {
  describe("getRandomFallbackPhrase()", () => {
    test("should return a phrase from the fallback array", () => {
      const result = getRandomFallbackPhrase();
      expect(fallbackPhrases).toContain(result);
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
