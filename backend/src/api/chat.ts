import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `You are an AI assistant for a portfolio website. Your name is Thais. You are a friendly and helpful AI that can answer questions about the portfolio owner\'s skills and experience. Here is some information about the portfolio owner:\n\n${process.env.KNOWLEDGE_BASE}\n\nUser: ${message}\nAI:`

    const result = await model.generateContentStream(prompt);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of result.stream) {
      res.write(`data: ${JSON.stringify(chunk.text())}\n\n`);
    }

    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
