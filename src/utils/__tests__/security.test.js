import { SecurityUtils, SECURITY_CONFIG } from "../security";

describe("Security Utils", () => {
  describe("sanitizeInput", () => {
    it("should remove HTML tags", () => {
      const input = '<script>alert("test")</script>Hello';
      const result = SecurityUtils.sanitizeInput(input);
      expect(result).toBe("Hello");
    });

    it("should remove dangerous characters", () => {
      const input = 'Hello"World&Test<>';
      const result = SecurityUtils.sanitizeInput(input);
      expect(result).toBe("HelloWorldTest");
    });

    it("should handle non-string input", () => {
      expect(SecurityUtils.sanitizeInput(null)).toBe("");
      expect(SecurityUtils.sanitizeInput(undefined)).toBe("");
      expect(SecurityUtils.sanitizeInput(123)).toBe("");
    });
  });

  describe("validateInput", () => {
    it("should validate shipment ID format", () => {
      expect(
        SecurityUtils.validateInput(
          "JOB001SHIP",
          SECURITY_CONFIG.PATTERNS.SHIPMENT_ID,
        ),
      ).toBe(true);
      expect(
        SecurityUtils.validateInput(
          "job001ship",
          SECURITY_CONFIG.PATTERNS.SHIPMENT_ID,
        ),
      ).toBe(false);
      expect(
        SecurityUtils.validateInput(
          "JOB-001",
          SECURITY_CONFIG.PATTERNS.SHIPMENT_ID,
        ),
      ).toBe(false);
    });

    it("should validate address format", () => {
      expect(
        SecurityUtils.validateInput(
          "123 Main St",
          SECURITY_CONFIG.PATTERNS.ADDRESS,
        ),
      ).toBe(true);
      expect(
        SecurityUtils.validateInput("", SECURITY_CONFIG.PATTERNS.ADDRESS),
      ).toBe(false);
    });
  });

  describe("containsMaliciousContent", () => {
    it("should detect script tags", () => {
      expect(
        SecurityUtils.containsMaliciousContent('<script>alert("xss")</script>'),
      ).toBe(true);
      expect(SecurityUtils.containsMaliciousContent("Normal text")).toBe(false);
    });

    it("should detect javascript: protocol", () => {
      expect(
        SecurityUtils.containsMaliciousContent('javascript:alert("xss")'),
      ).toBe(true);
    });

    it("should detect event handlers", () => {
      expect(
        SecurityUtils.containsMaliciousContent('onclick=alert("xss")'),
      ).toBe(true);
    });
  });

  describe("maskSensitiveData", () => {
    it("should mask phone numbers", () => {
      const phone = "+1-555-123-4567";
      const masked = SecurityUtils.maskSensitiveData(phone, "phone");
      expect(masked).toContain("XXX");
      expect(masked).not.toContain("123");
    });

    it("should mask email addresses", () => {
      const email = "user@example.com";
      const masked = SecurityUtils.maskSensitiveData(email, "email");
      expect(masked).toContain("X");
      expect(masked).toContain("@example.com");
    });
  });

  describe("generateSecureId", () => {
    it("should generate ID of specified length", () => {
      const id = SecurityUtils.generateSecureId(8);
      expect(id).toHaveLength(8);
      expect(/^[A-Z0-9]+$/.test(id)).toBe(true);
    });

    it("should generate different IDs on subsequent calls", () => {
      const id1 = SecurityUtils.generateSecureId();
      const id2 = SecurityUtils.generateSecureId();
      expect(id1).not.toBe(id2);
    });
  });
});
