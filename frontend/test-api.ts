import { buildAugmentedPrompt } from "./src/utils/promptBuilder.js";

async function run() {
  const prompt = buildAugmentedPrompt("projetos");
  console.log("Augmented prompt length:", prompt.length);
  
  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer sk-46cd78f33cc84bf1bb547df992d951c7`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: "projetos" }
      ],
      temperature: 0.9,
      max_tokens: 2048,
    }),
  });
  
  console.log("Status:", res.status);
  const data = await res.json();
  if (!res.ok) console.log("Error:", JSON.stringify(data, null, 2));
  else console.log("Success! Characters:", data.choices[0].message.content.length);
}
run();
