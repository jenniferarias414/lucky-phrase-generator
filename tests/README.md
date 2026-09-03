# Testing Strategy & Documentation

## Overview

This directory contains automated tests for the Lucky Phrase Generator application. The test suite validates critical business logic and ensures code reliability through continuous verification. This approach aligns with industry best practices for maintainable, production-grade software.

---

## Testing Philosophy

### Why We Test

Testing serves three primary objectives in professional software development:

1. **Regression Detection** - Automated tests catch breaking changes before deployment
2. **Documentation** - Tests demonstrate expected behavior and serve as living documentation
3. **Refactoring Safety** - Confidence to improve code architecture without fear of unintended side effects

### What We Test vs. What We Skip

**We Test:**
- **Business Logic** - The core algorithms and data transformations (favorites persistence, random selection, category filtering, API parsing)
- **Edge Cases** - Boundary conditions and error scenarios (empty arrays, invalid data, localStorage corruption)
- **Critical Paths** - User-facing features that directly impact application reliability

**We Skip:**
- **UI Styling** - Visual presentation is best validated through manual testing and design review
- **DOM Manipulation** - View logic is typically tested through integration or end-to-end testing
- **External APIs** - Real API calls are mocked to ensure tests are deterministic and fast

---

## Test Files

### `favorites.test.js` (13 tests)

Tests the localStorage integration and favorites toggle system. This validates data persistence—a critical requirement for user trust.

**Tests:**
- **loadFavorites()** - Verifies localStorage retrieval and handles edge cases (empty storage, corrupted data)
- **saveFavorites()** - Confirms data is persisted correctly and overwrites previous state
- **isFavorited()** - Validates presence checks with case sensitivity
- **toggleFavorite()** - Tests the add/remove logic, state transitions, and preservation of unrelated data

**Key Concepts:**
- Test isolation through `beforeEach()` (clearing localStorage)
- Mocking external dependencies (localStorage)
- State mutation and verification

### `randomization.test.js` (16 tests)

Tests the random selection functions that provide variety and API source distribution.

**Tests:**
- **fallbackPhrases** - Validates categorized phrase object structure
- **getRandomFallbackPhrase()** - Validates selection from array, category-aware selection, string return values, and invalid-category fallback
- **getFallbackPhrasesByCategory()** - Confirms filtering for All, invalid categories, and specific categories
- **getRandomApiSource()** - Confirms proper API source selection and structure validation
- **Distribution Testing** - Probabilistic tests verify randomness over multiple iterations

**Key Concepts:**
- Deterministic testing of probabilistic functions
- Collection-based assertions (`toContain`, `toHaveProperty`)
- Iteration and sampling strategies for randomness validation

### `phrase.category.test.js` (5 tests)

Tests the phrase category constants and local fallback phrase filtering behavior.

**Tests:**
- **PHRASE_CATEGORIES** - Confirms the expected category options are exposed
- **getFallbackPhrasesByCategory()** - Validates All, invalid-category, and specific-category filtering
- **Category Availability** - Confirms each selectable local category has at least one phrase

**Key Concepts:**
- Constant validation
- Filtered collection assertions
- Guarding user-facing category options from empty result sets

### `api.test.js` (12 tests)

Tests the API response parsers that transform external API responses into displayable content.

**Tests:**
- **parseAdviceSlipResponse()** - Handles Advice Slip's specific JSON structure
- **parseQuotableResponse()** - Formats Quotable's response with author attribution
- **Robustness Tests** - Validates parsers ignore irrelevant fields and handle unexpected data

**Key Concepts:**
- Mock objects representing real API responses
- Data transformation validation
- Defensive programming (handling extra/missing fields)

### `theme.test.js` (17 tests)

Tests the dark mode theme management system, localStorage persistence, and system preference detection.

**Tests:**
- **getCurrentTheme()** - Validates theme retrieval from localStorage with system preference fallback
- **setTheme()** - Confirms theme persistence to localStorage and DOM attribute application
- **toggleTheme()** - Tests bidirectional theme switching
- **Theme Persistence** - Validates saved theme survives simulated page reloads
- **Error Handling** - Ensures corrupted localStorage data is handled gracefully

**Key Concepts:**
- DOM attribute manipulation (`data-theme`)
- System API detection (`window.matchMedia`)
- Data validation and normalization
- Graceful degradation when localStorage is corrupted

---

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test -- favorites.test.js
```

### Run in Watch Mode (Rerun on file changes)
```bash
npm test -- --watch
```

### Run with Coverage Report
```bash
npm test -- --coverage
```

---

## Test Metrics

- **Total Tests:** 69
- **Covered Functions:** 12 pure utility functions
- **Test Categories:** Favorites (13), Randomization (16), Phrase Categories (5), API Parsing (12), Theme (17), Clipboard (6)
- **Coverage Goal:** 90%+ for business logic

---

## Adding New Tests

When adding features, follow this pattern:

1. **Extract Logic** - Move business logic into `utils.js` as pure functions
2. **Create Test File** - Add `feature.test.js` in the `tests/` directory
3. **Follow Naming Conventions**:
   - Test files: `featureName.test.js`
   - Test suites: `describe("Feature Name", ...)`
   - Test cases: `test("should [expected behavior]", ...)`
4. **Test the Behavior, Not the Implementation** - Focus on inputs and outputs, not internal details

### Example: Testing a New Feature

```javascript
describe("New Feature", () => {
  test("should produce expected output from input", () => {
    const input = "test data";
    const result = myNewFunction(input);
    expect(result).toBe("expected output");
  });

  test("should handle edge case gracefully", () => {
    const result = myNewFunction(null);
    expect(result).toBeDefined();
  });
});
```

---

## Best Practices Demonstrated

### 1. Isolation
Each test runs independently. `beforeEach()` clears localStorage before each test to prevent state leakage.

### 2. Descriptive Naming
Test names clearly describe expected behavior: `"should add a phrase to favorites if not present"` immediately communicates the test's purpose.

### 3. Single Responsibility
Each test validates one specific behavior. Complex scenarios are broken into multiple tests.

### 4. Arrange-Act-Assert
Tests follow the AAA pattern:
```javascript
// Arrange
const phrase = "Test phrase";

// Act
toggleFavorite(phrase);

// Assert
expect(isFavorited(phrase)).toBe(true);
```

### 5. Mock External Dependencies
localStorage is mocked to avoid file system side effects and ensure test reliability.

### 6. Edge Case Coverage
Tests include boundary conditions: empty arrays, corrupted data, special characters, and type variations.

---

## Technology Stack

- **Jest** - Industry-standard JavaScript testing framework
  - Chosen for: Simplicity, extensive documentation, large community support
  - Used by: Facebook, Google, Microsoft, Spotify, and 4M+ npm packages

---

## Integration with CI/CD

To integrate tests into a continuous integration pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm test -- --coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

---

## Further Learning

- **Jest Documentation:** https://jestjs.io/
- **Testing Best Practices:** https://testingjavascript.com/
- **Test-Driven Development:** https://en.wikipedia.org/wiki/Test-driven_development

---

## Contributing to Test Suite

When contributing new functionality:
1. Write tests first (TDD approach)
2. Ensure 90%+ coverage for new code
3. Follow existing test patterns and naming conventions
4. Document the feature being tested

---

**Last Updated:** September 3, 2026
**Test Framework:** Jest 29+
**Node Version:** 18+
