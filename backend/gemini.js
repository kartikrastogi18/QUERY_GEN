import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function generateSQL(prompt) {
    // const response = await fetch(
    //     "https://generativelanguage.googleapis.com/models/gemini-2.0-flash-lite:generateContent?key=" +
    //     process.env.GEMINI_API_KEY,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       contents: [
    //         {
    //           parts: [{ text: prompt }]
    //         }
    //       ]
    //     })
    //   }
    // );
  
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });
    // const data = await response.text;
    let data=response.text.trim();
    console.log("--dttatataa", data)
  
    // 🔴 VERY IMPORTANT: defensive checks
    // if (
    //   !data.candidates ||
    //   !data.candidates[0] ||
    //   !data.candidates[0].content ||
    //   !data.candidates[0].content.parts ||
    //   !data.candidates[0].content.parts[0]
    // ) {
    //   console.error("Gemini raw response:", JSON.stringify(data, null, 2));
    //   throw new Error("Invalid response from Gemini API");
    // }
  
    return data;
}
  
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function generateSQL(prompt) {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash"
//   });

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();

//   if (!text) {
//     throw new Error("Empty response from Gemini");
//   }

//   return text;
// }
