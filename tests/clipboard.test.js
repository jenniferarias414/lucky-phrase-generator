// Clipboard Feature Tests
// Tests the copy-to-clipboard functionality

const { copyToClipboard } = require("../utils");

describe("Clipboard Copy Feature", () => {
  // Save the original navigator.clipboard
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    // Restore the original clipboard after each test
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      writable: true,
      configurable: true
    });
  });

  describe("copyToClipboard()", () => {
    test("should return true when text is successfully copied to clipboard", async () => {
      // Mock navigator.clipboard.writeText to succeed
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined)
        },
        writable: true,
        configurable: true
      });

      const result = await copyToClipboard("Test phrase");
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test phrase");
    });

    test("should return false when clipboard API is not available", async () => {
      // Mock unavailable clipboard API
      Object.defineProperty(navigator, "clipboard", {
        value: null,
        writable: true,
        configurable: true
      });

      const result = await copyToClipboard("Test phrase");
      expect(result).toBe(false);
    });

    test("should return false when clipboard.writeText rejects", async () => {
      // Mock navigator.clipboard.writeText to reject
      const mockError = new Error("Permission denied");
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: jest.fn().mockRejectedValue(mockError)
        },
        writable: true,
        configurable: true
      });

      const result = await copyToClipboard("Test phrase");
      // Should return false because the write failed
      expect(result).toBe(false);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test phrase");
    });

    test("should return false when text is empty string", async () => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined)
        },
        writable: true,
        configurable: true
      });

      const result = await copyToClipboard("");
      expect(result).toBe(false);
      // Clipboard API should not be called for empty text
      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });

    test("should return false when text is null or undefined", async () => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined)
        },
        writable: true,
        configurable: true
      });

      expect(await copyToClipboard(null)).toBe(false);
      expect(await copyToClipboard(undefined)).toBe(false);
      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });

    test("should handle multiline text correctly", async () => {
      const multilineText = "Line 1\nLine 2\nLine 3";

      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined)
        },
        writable: true,
        configurable: true
      });

      const result = await copyToClipboard(multilineText);
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(multilineText);
    });
  });
});
