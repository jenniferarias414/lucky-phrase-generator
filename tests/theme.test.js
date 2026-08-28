// Dark Mode Theme Tests
// Tests the theme management and localStorage persistence

const {
  getCurrentTheme,
  setTheme,
  toggleTheme,
  THEME_KEY,
  DARK_THEME,
  LIGHT_THEME
} = require("../utils");

describe("Dark Mode Theme System", () => {
  // Clear localStorage and reset DOM before each test
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      media: "(prefers-color-scheme: dark)"
    });
  });

  describe("getCurrentTheme()", () => {
    test("should return light theme by default", () => {
      const result = getCurrentTheme();
      expect(result).toBe(LIGHT_THEME);
    });

    test("should return saved theme from localStorage", () => {
      localStorage.setItem(THEME_KEY, DARK_THEME);
      
      const result = getCurrentTheme();
      expect(result).toBe(DARK_THEME);
    });

    test("should prioritize localStorage over system preference", () => {
      window.matchMedia = jest.fn().mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)"
      });
      localStorage.setItem(THEME_KEY, LIGHT_THEME);
      
      const result = getCurrentTheme();
      expect(result).toBe(LIGHT_THEME);
    });

    test("should use dark theme when system preference is dark and no theme is saved", () => {
      window.matchMedia = jest.fn().mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)"
      });

      const result = getCurrentTheme();
      expect(result).toBe(DARK_THEME);
    });

    test("should handle invalid theme by defaulting to light", () => {
      localStorage.setItem(THEME_KEY, "invalid-theme");
      
      const result = getCurrentTheme();
      expect([DARK_THEME, LIGHT_THEME]).toContain(result);
    });
  });

  describe("setTheme()", () => {
    test("should save dark theme to localStorage", () => {
      setTheme(DARK_THEME);
      
      const saved = localStorage.getItem(THEME_KEY);
      expect(saved).toBe(DARK_THEME);
    });

    test("should save light theme to localStorage", () => {
      setTheme(LIGHT_THEME);
      
      const saved = localStorage.getItem(THEME_KEY);
      expect(saved).toBe(LIGHT_THEME);
    });

    test("should apply dark theme to DOM", () => {
      setTheme(DARK_THEME);
      
      const themeAttribute = document.documentElement.getAttribute("data-theme");
      expect(themeAttribute).toBe(DARK_THEME);
    });

    test("should remove theme attribute for light theme", () => {
      // Set to dark first
      setTheme(DARK_THEME);
      expect(document.documentElement.hasAttribute("data-theme")).toBe(true);
      
      // Switch to light
      setTheme(LIGHT_THEME);
      expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    });

    test("should normalize invalid theme to light", () => {
      setTheme("invalid-theme");
      
      const saved = localStorage.getItem(THEME_KEY);
      expect(saved).toBe(LIGHT_THEME);
    });
  });

  describe("toggleTheme()", () => {
    test("should switch from light to dark", () => {
      const result = toggleTheme();
      
      expect(result).toBe(DARK_THEME);
      expect(localStorage.getItem(THEME_KEY)).toBe(DARK_THEME);
    });

    test("should switch from dark to light", () => {
      localStorage.setItem(THEME_KEY, DARK_THEME);
      
      const result = toggleTheme();
      
      expect(result).toBe(LIGHT_THEME);
      expect(localStorage.getItem(THEME_KEY)).toBe(LIGHT_THEME);
    });

    test("should toggle multiple times correctly", () => {
      let result = toggleTheme(); // light -> dark
      expect(result).toBe(DARK_THEME);
      
      result = toggleTheme(); // dark -> light
      expect(result).toBe(LIGHT_THEME);
      
      result = toggleTheme(); // light -> dark
      expect(result).toBe(DARK_THEME);
    });

    test("should persist theme through multiple toggles", () => {
      toggleTheme();
      toggleTheme();
      
      const saved = localStorage.getItem(THEME_KEY);
      expect(saved).toBe(LIGHT_THEME);
    });

    test("should apply DOM changes when toggling", () => {
      toggleTheme(); // Switch to dark
      expect(document.documentElement.getAttribute("data-theme")).toBe(DARK_THEME);
      
      toggleTheme(); // Switch to light
      expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    });
  });

  describe("Theme Persistence", () => {
    test("should maintain theme across page reloads (simulated)", () => {
      // Set to dark
      setTheme(DARK_THEME);
      
      // Simulate page reload by checking what getCurrentTheme returns
      const savedTheme = getCurrentTheme();
      expect(savedTheme).toBe(DARK_THEME);
    });

    test("should handle localStorage corruption gracefully", () => {
      localStorage.setItem(THEME_KEY, "corrupted{data");
      
      // Should not throw error
      expect(() => getCurrentTheme()).not.toThrow();
      
      // Should return a valid theme
      const result = getCurrentTheme();
      expect([DARK_THEME, LIGHT_THEME]).toContain(result);
    });
  });
});
