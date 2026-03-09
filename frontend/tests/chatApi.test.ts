import { describe, expect, it } from "vitest";
import handler, { validateBody } from "../api/chat";

describe("chat api validation", () => {
  it("accepts a valid payload", () => {
    const parsed = validateBody({
      messages: [{ role: "user", content: "hello" }],
      temperature: 0.7,
      max_tokens: 123,
    });

    expect(parsed).not.toBeNull();
    expect(parsed?.messages[0].role).toBe("user");
  });

  it("rejects an invalid payload", () => {
    const parsed = validateBody({
      messages: [{ role: "bad-role", content: "" }],
    });
    expect(parsed).toBeNull();
  });
});

describe("chat api handler", () => {
  it("returns 405 on non-POST", async () => {
    const req = { method: "GET" };
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({
      error: { code: "INVALID_REQUEST", message: "Method not allowed." },
    });
  });
});

function createMockRes() {
  return {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
    },
  };
}
