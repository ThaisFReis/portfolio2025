type Role = "system" | "user" | "assistant";

interface ChatMessageInput {
  role: Role;
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessageInput[];
  temperature?: number;
  max_tokens?: number;
}

interface ApiErrorBody {
  error: {
    code: "INVALID_REQUEST" | "CONFIG_ERROR" | "UPSTREAM_ERROR";
    message: string;
  };
}

interface ApiSuccessBody {
  content: string;
  provider: "deepseek";
  model: "deepseek-chat";
}

interface ReqLike {
  method?: string;
  body?: unknown;
}

interface ResLike {
  status: (statusCode: number) => ResLike;
  json: (body: ApiErrorBody | ApiSuccessBody) => void;
}

function sendError(
  res: ResLike,
  statusCode: number,
  code: ApiErrorBody["error"]["code"],
  message: string
) {
  res.status(statusCode).json({ error: { code, message } });
}

export function validateBody(body: unknown): ChatRequestBody | null {
  if (!body || typeof body !== "object") return null;
  const candidate = body as Partial<ChatRequestBody>;
  if (!Array.isArray(candidate.messages) || candidate.messages.length === 0) {
    return null;
  }

  const validMessages = candidate.messages.every(
    (message) =>
      message &&
      typeof message === "object" &&
      ["system", "user", "assistant"].includes((message as ChatMessageInput).role) &&
      typeof (message as ChatMessageInput).content === "string" &&
      (message as ChatMessageInput).content.trim().length > 0
  );

  if (!validMessages) return null;

  return {
    messages: candidate.messages as ChatMessageInput[],
    temperature: typeof candidate.temperature === "number" ? candidate.temperature : 0.9,
    max_tokens: typeof candidate.max_tokens === "number" ? candidate.max_tokens : 2048,
  };
}

export default async function handler(req: ReqLike, res: ResLike) {
  if (req.method !== "POST") {
    return sendError(res, 405, "INVALID_REQUEST", "Method not allowed.");
  }

  const parsed = validateBody(req.body);
  if (!parsed) {
    return sendError(res, 400, "INVALID_REQUEST", "Invalid request body.");
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return sendError(res, 500, "CONFIG_ERROR", "Server API key is not configured.");
  }

  try {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: parsed.messages,
        temperature: parsed.temperature,
        max_tokens: parsed.max_tokens,
      }),
    });

    const payload = await upstream.json();

    if (!upstream.ok) {
      const message =
        (payload &&
          typeof payload === "object" &&
          "error" in payload &&
          payload.error &&
          typeof payload.error === "object" &&
          "message" in payload.error &&
          typeof payload.error.message === "string" &&
          payload.error.message) ||
        `Upstream request failed with status ${upstream.status}.`;
        
      console.error("DEEPSEEK API ERROR:", upstream.status, message, payload);

      return sendError(res, upstream.status, "UPSTREAM_ERROR", message);
    }

    const content =
      payload &&
      typeof payload === "object" &&
      "choices" in payload &&
      Array.isArray(payload.choices) &&
      payload.choices[0] &&
      payload.choices[0].message &&
      typeof payload.choices[0].message.content === "string"
        ? payload.choices[0].message.content
        : "";

    if (!content) {
      return sendError(
        res,
        502,
        "UPSTREAM_ERROR",
        "Upstream response did not include assistant content."
      );
    }

    return res.status(200).json({
      content,
      provider: "deepseek",
      model: "deepseek-chat",
    });
  } catch (err) {
    console.error("API ROUTE EXCEPTION:", err);
    return sendError(res, 502, "UPSTREAM_ERROR", "Failed to reach upstream AI provider.");
  }
}
