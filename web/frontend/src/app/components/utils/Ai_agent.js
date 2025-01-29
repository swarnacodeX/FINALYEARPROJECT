//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
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
  dangerouslyAllowBrowser: true,
})

export async function AI_response() {
  const completion = await openai.chat.completions.create({
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    messages: [{"role":"user","content":"What can you do"}],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: true,
  })
  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }

  
  
}
AI_response();
