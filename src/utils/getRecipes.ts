import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API
});
export const openai = new OpenAIApi(configuration);



export async function getRecipes(data: FormData)  {
  const text = data.get("ingredients")?.toString()
  console.log('text', text)
   return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write a recipe based on these ingredients:\n\n${text}. Output must start with the recipe title.`,
    temperature: 0.3,
    max_tokens: 120,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  });
};