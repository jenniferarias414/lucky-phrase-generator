// API Parser Tests
// Tests the parsing logic for each external API's response format

const {
  parseAdviceSlipResponse,
  parseQuotableResponse
} = require("../utils");

describe("API Response Parsers", () => {
  describe("parseAdviceSlipResponse()", () => {
    test("should extract advice text from Advice Slip response", () => {
      const mockResponse = {
        slip: {
          advice: "Good things are already on their way."
        }
      };
      
      const result = parseAdviceSlipResponse(mockResponse);
      expect(result).toBe("Good things are already on their way.");
    });

    test("should handle multi-line advice", () => {
      const mockResponse = {
        slip: {
          advice: "Line 1\nLine 2\nLine 3"
        }
      };
      
      const result = parseAdviceSlipResponse(mockResponse);
      expect(result).toBe("Line 1\nLine 2\nLine 3");
    });

    test("should handle special characters", () => {
      const mockResponse = {
        slip: {
          advice: "Don't stop when you're tired. Stop when you're done. (100%)"
        }
      };
      
      const result = parseAdviceSlipResponse(mockResponse);
      expect(result).toBe("Don't stop when you're tired. Stop when you're done. (100%)");
    });

    test("should return a non-empty string", () => {
      const mockResponse = {
        slip: {
          advice: "Keep going."
        }
      };
      
      const result = parseAdviceSlipResponse(mockResponse);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("parseQuotableResponse()", () => {
    test("should format quote with author attribution", () => {
      const mockResponse = {
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(result).toBe("The only way to do great work is to love what you do. — Steve Jobs");
    });

    test("should handle authors with complex names", () => {
      const mockResponse = {
        content: "Success is not final, failure is not fatal.",
        author: "Winston S. Churchill"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(result).toContain("Winston S. Churchill");
    });

    test("should handle quotes with quotation marks", () => {
      const mockResponse = {
        content: "I came, I saw, I conquered.",
        author: "Julius Caesar"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(result).toBe("I came, I saw, I conquered. — Julius Caesar");
    });

    test("should always include the em dash separator", () => {
      const mockResponse = {
        content: "Any quote",
        author: "Any Author"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(result).toContain(" — ");
    });

    test("should not trim or modify the content", () => {
      const mockResponse = {
        content: "  Quote with spaces  ",
        author: "Author"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(result).toContain("  Quote with spaces  ");
    });

    test("should return a non-empty string", () => {
      const mockResponse = {
        content: "Quote",
        author: "Author"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("Parser Robustness", () => {
    test("Advice Slip parser should handle unexpected properties", () => {
      const mockResponse = {
        slip: {
          advice: "Good things ahead.",
          slip_id: 12345,
          permanent_url: "https://example.com"
        }
      };
      
      const result = parseAdviceSlipResponse(mockResponse);
      expect(result).toBe("Good things ahead.");
    });

    test("Quotable parser should prioritize content and author fields", () => {
      const mockResponse = {
        _id: "abc123",
        tags: ["inspiration"],
        content: "The actual quote",
        author: "The Author",
        authorSlug: "the-author"
      };
      
      const result = parseQuotableResponse(mockResponse);
      expect(result).toBe("The actual quote — The Author");
    });
  });
});
